import Stripe from "stripe";

let cachedStripe: Stripe | null = null;

export function getStripe() {
  if (!cachedStripe) {
    cachedStripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return cachedStripe;
}
