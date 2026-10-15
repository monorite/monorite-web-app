import { buildMetadata } from "@/lib/seo";
import { aiSolutionsLanding } from "@/data/service-landings";
import ServiceLandingPage from "@/components/sections/ServiceLandingPage";

export const metadata = buildMetadata({
  title: aiSolutionsLanding.seoTitle,
  description: aiSolutionsLanding.seoDescription,
  path: aiSolutionsLanding.path,
  keywords: aiSolutionsLanding.keywords,
});

export default function AISolutionsPage() {
  return <ServiceLandingPage landing={aiSolutionsLanding} />;
}
