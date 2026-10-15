import { site } from "@/data/site";

/** First-party preference set only when a visitor picks a country.
 * Geo detection never writes this. */
export const CONTACT_REGION_COOKIE = "monorite-contact-country";

export const CONTACT_REGION_MAX_AGE = 60 * 60 * 24 * 365;

export type ContactRegionId = "IN" | "AU";

export interface ContactRegion {
  id: ContactRegionId;
  /** URL slug under /contact. */
  slug: "india" | "australia";
  label: string;
  /** On-page label. Australia is contact details, not an office. */
  detailsLabel: string;
  path: string;
  /** Display string. Null when no number is published for this region. */
  phone: string | null;
  /** E.164 tel: href. Null when `phone` is null. */
  phoneHref: string | null;
  location: string;
  mapTitle: string;
  /** Rajahmundry is the business location. Sunshine North is not. */
  isBusinessLocation: boolean;
  /** Full document title. Not suffixed again with the site name. */
  documentTitle: string;
  metaDescription: string;
  heading: string;
}

export const contactRegions: Record<ContactRegionId, ContactRegion> = {
  IN: {
    id: "IN",
    slug: "india",
    label: "India",
    detailsLabel: "India contact details",
    path: "/contact/india",
    phone: null,
    phoneHref: null,
    location: site.location,
    mapTitle: `Map of ${site.name} in Rajahmundry`,
    isBusinessLocation: true,
    documentTitle: "Contact Monorite India | Rajahmundry, Andhra Pradesh",
    metaDescription: `Contact ${site.name} at the business address in Rajahmundry, Andhra Pradesh.`,
    heading: "Contact us in Rajahmundry",
  },
  AU: {
    id: "AU",
    slug: "australia",
    label: "Australia",
    detailsLabel: "Australian contact details",
    path: "/contact/australia",
    phone: "0468 588 669",
    phoneHref: "tel:+61468588669",
    location: "17A Augusta Crescent, Sunshine North VIC 3020, Australia",
    mapTitle: "Map of the Australian contact address",
    isBusinessLocation: false,
    documentTitle: "Contact Monorite International | Australia",
    metaDescription: `Australian address and phone for contacting ${site.name} from outside India.`,
    heading: "Contact details outside India",
  },
};

export const contactRegionList: ContactRegion[] = [contactRegions.IN, contactRegions.AU];

const SLUG_TO_REGION: Record<string, ContactRegion> = {
  india: contactRegions.IN,
  australia: contactRegions.AU,
};

export function getContactRegionBySlug(slug: string): ContactRegion | undefined {
  return SLUG_TO_REGION[slug];
}

/** Cookie wins, then a country header, then Australia.
 * Only an explicit India signal selects India. */
export function contactRegionFromSignals(
  cookie: string | undefined,
  countryHeader: string | null,
): ContactRegionId {
  if (cookie === "IN" || cookie === "AU") return cookie;
  if (countryHeader?.trim().toUpperCase() === "IN") return "IN";
  return "AU";
}
