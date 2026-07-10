import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { razorpayClient, isRazorpayMock } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Missing planId parameter." }, { status: 400 });
    }

    const plan = await db.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Selected plan not found." }, { status: 404 });
    }

    if (isRazorpayMock || !razorpayClient) {
      const mockOrderId = `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      await db.payment.create({
        data: {
          userId,
          amount: plan.price,
          currency: "INR",
          status: "PENDING",
          razorpayOrderId: mockOrderId,
          description: `Franchise Subscription - ${plan.name}`,
        },
      });

      return NextResponse.json({
        isMock: true,
        orderId: mockOrderId,
        amount: plan.price * 100,
        currency: "INR",
        planName: plan.name,
        planPrice: plan.price,
        planId: plan.id,
      });
    }

    const options = {
      amount: Math.round(plan.price * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        planId: plan.id,
        userId,
      },
    };

    const order = await razorpayClient.orders.create(options);

    await db.payment.create({
      data: {
        userId,
        amount: plan.price,
        currency: "INR",
        status: "PENDING",
        razorpayOrderId: order.id,
        description: `Franchise Subscription - ${plan.name}`,
      },
    });

    return NextResponse.json({
      isMock: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planName: plan.name,
      planPrice: plan.price,
      planId: plan.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json({ error: "Failed to create payment order." }, { status: 500 });
  }
}
