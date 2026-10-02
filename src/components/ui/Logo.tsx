import Image from "next/image";
import { cn } from "@/lib/utils";

/** Official Monorite mark (the M only). The full lockup lives at
 * /images/brand/monorite-logo.png and is too wide for these slots. */
export default function Logo({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/brand/monorite-logo-1.png"
      alt="Monorite"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}
