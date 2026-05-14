export type AnalyticsEvent =
  | "signup"
  | "login"
  | "generation_created"
  | "template_used"
  | "checkout_started"
  | "subscription_active"
  | "subscription_cancelled"
  | "page_view"
  | "cta_clicked";

export function trackEvent(
  name: AnalyticsEvent | string,
  data: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") {
    // Server-side stub.
    console.log(`[analytics] ${name}`, data);
    return;
  }
  // Browser stub — replace with PostHog/Mixpanel/etc later.
  console.log(`[analytics] ${name}`, data);
}
