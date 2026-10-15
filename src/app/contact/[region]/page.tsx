import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import {
  contactLanguageAlternates,
  contactRegionList,
  getContactRegionBySlug,
} from "@/data/contact-regions";
import ContactPageView from "@/components/sections/ContactPageView";

// Both slugs are known at build time. Unknown ones are real 404s, matching
// the service and blog routes, so a bad URL is not cached as HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return contactRegionList.map((region) => ({ region: region.slug }));
}

export function generateMetadata({ params }: { params: { region: string } }) {
  const region = getContactRegionBySlug(params.region);
  if (!region) return buildMetadata({ title: "Contact", noIndex: true });

  const description =
    region.id === "IN"
      ? `Contact ${site.name} in Rajahmundry, Andhra Pradesh, India.`
      : `Australian contact details for ${site.name}: address and phone for visitors outside India.`;

  return buildMetadata({
    title: "Contact",
    description,
    path: region.path,
    languages: contactLanguageAlternates,
  });
}

export default function ContactRegionPage({ params }: { params: { region: string } }) {
  const region = getContactRegionBySlug(params.region);
  if (!region) notFound();
  return <ContactPageView region={region} />;
}
