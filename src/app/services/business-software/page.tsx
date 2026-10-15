import { buildMetadata } from "@/lib/seo";
import { businessSoftwareLanding } from "@/data/service-landings";
import ServiceLandingPage from "@/components/sections/ServiceLandingPage";

export const metadata = buildMetadata({
  title: businessSoftwareLanding.seoTitle,
  description: businessSoftwareLanding.seoDescription,
  path: businessSoftwareLanding.path,
  keywords: businessSoftwareLanding.keywords,
});

export default function BusinessSoftwarePage() {
  return <ServiceLandingPage landing={businessSoftwareLanding} />;
}
