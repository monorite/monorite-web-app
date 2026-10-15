import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { contactRegions } from "@/data/contact-regions";
import { resolveContactRegion } from "@/lib/contact-region";
import ContactPageView from "@/components/sections/ContactPageView";

const contactEntry = {
  title: "Contact Monorite | Let's Discuss Your Project",
  description: `Tell ${site.name} about the project. We read every message and reply within one business day.`,
  heading: "Let's discuss your project",
};

export const metadata = buildMetadata({
  title: contactEntry.title,
  description: contactEntry.description,
  path: "/contact",
  exactTitle: true,
});

/** Country-aware entry URL. Canonical stays /contact.
 * India and Australia each also have a stable, crawlable URL. */
export default function ContactPage() {
  const region = contactRegions[resolveContactRegion()];
  return <ContactPageView region={region} heading={contactEntry.heading} />;
}
