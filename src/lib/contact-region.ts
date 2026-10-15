import { cookies, headers } from "next/headers";
import {
  CONTACT_REGION_COOKIE,
  contactRegionFromSignals,
  type ContactRegionId,
} from "@/data/contact-regions";

/** Country for the /contact entry URL.
 * An explicit selection (cookie) wins over IP country.
 * A missing or unrecognised country defaults to Australia.
 * Vercel sends `x-vercel-ip-country`; Cloudflare sends `cf-ipcountry`. */
export function resolveContactRegion(): ContactRegionId {
  const selected = cookies().get(CONTACT_REGION_COOKIE)?.value;
  const country =
    headers().get("x-vercel-ip-country") ?? headers().get("cf-ipcountry");
  return contactRegionFromSignals(selected, country);
}
