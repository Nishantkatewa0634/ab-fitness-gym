import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_yourkeyhere";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "razorpay_secret_placeholder";

export const isRazorpayMock =
  keyId === "rzp_test_yourkeyhere" || !process.env.RAZORPAY_KEY_ID;

export const razorpayClient = isRazorpayMock
  ? null
  : new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateCardNumber(): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `ABF-${year}-${randomDigits}`;
}
