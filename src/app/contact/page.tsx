import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { contactRegions } from "@/data/contact-regions";
import { resolveContactRegion } from "@/lib/contact-region";
import ContactPageView from "@/components/sections/ContactPageView";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} to talk through your AI or automation project.`,
  path: "/contact",
});

/** Country-aware entry URL. Canonical stays /contact.
 * India and Australia each also have a stable, crawlable URL. */
export default function ContactPage() {
  const region = contactRegions[resolveContactRegion()];
  return <ContactPageView region={region} />;
}
