import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateCardNumber } from "@/lib/razorpay";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, planId } = await req.json();

    if (!razorpayOrderId || !planId) {
      return NextResponse.json({ error: "Missing required verification parameters." }, { status: 400 });
    }

    // Check if it's a sandbox mock transaction
    const isMockOrder = razorpayOrderId.startsWith("order_mock_");
    let verified = false;

    if (isMockOrder) {
      verified = razorpaySignature === "mock_signature";
    } else {
      const secret = process.env.RAZORPAY_KEY_SECRET || "";
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
      verified = generatedSignature === razorpaySignature;
    }

    if (!verified) {
      // Mark payment failed
      await db.payment.updateMany({
        where: { razorpayOrderId },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
    }

    // 1. Fetch Plan details
    const plan = await db.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 404 });
    }

    // 2. Create membership or update existing
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.duration * 30 * 24 * 60 * 60 * 1000);
    const cardNumber = generateCardNumber();

    const membership = await db.membership.create({
      data: {
        userId,
        planId: plan.id,
        status: "ACTIVE",
        cardNumber,
        startDate,
        endDate,
        autoRenew: true,
      },
    });

    // 3. Mark payment success and link membership
    await db.payment.updateMany({
      where: { razorpayOrderId },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpayPaymentId || `pay_mock_${Date.now()}`,
        razorpaySignature: razorpaySignature || "mock_signature",
        membershipId: membership.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified and membership activated!",
      membershipId: membership.id,
      cardNumber,
    });
  } catch (error) {
    console.error("Payment Verify Error:", error);
    return NextResponse.json({ error: "Internal server error verifying payment." }, { status: 500 });
  }
}
