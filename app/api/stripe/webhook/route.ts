import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-04-30.basil" as Stripe.LatestApiVersion,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      // TODO: Update user plan in database
      console.log("Subscription event:", event.type, event.data.object);
      break;
    case "customer.subscription.deleted":
      // TODO: Downgrade user to free plan
      console.log("Subscription cancelled:", event.data.object);
      break;
    case "invoice.payment_succeeded":
      console.log("Payment succeeded:", event.data.object);
      break;
    case "invoice.payment_failed":
      console.log("Payment failed:", event.data.object);
      break;
    default:
      console.log("Unhandled Stripe event:", event.type);
  }

  return NextResponse.json({ received: true });
}
