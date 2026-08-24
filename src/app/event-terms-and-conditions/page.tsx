import type { Metadata } from "next";
import EventTermsAndConditions from "@/components/first-light/EventTermsAndConditions";

export const metadata: Metadata = {
  title: "Event Terms & Conditions | First Light",
  description:
    "Official Event Terms & Conditions for First Light, headlined by Axwell, at DHA Sports Club (Moin Khan Academy), Phase 8, Karachi — presented by OP Productions.",
};

export default function EventTermsAndConditionsPage() {
  return <EventTermsAndConditions />;
}
