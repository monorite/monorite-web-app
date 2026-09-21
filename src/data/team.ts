/**
 * Founders shown in the homepage "Studio" section.
 */
export interface TeamMember {
  name: string;
  role: string;
  /** Short "years · stack" fragment shown next to the role. Omitted rather
   * than guessed when not confirmed — better an asymmetric pair of cards
   * than an invented credential sitting on a public page. */
  credentials?: string;
  focus: string;
  imageSrc: string | null;
  imageAlt: string;
  /** Tailwind object-position class for portrait framing. Defaults to
   * object-center — use object-top (etc.) when the source photo is a
   * full-body shot that would otherwise crop the face out. */
  imagePosition?: string;
}

export const team: TeamMember[] = [
  {
    name: "Mahesh Pedapati",
    role: "Co-founder",
    credentials: "3+ yrs · React, Next.js, React Native",
    focus: "Product, systems architecture, and the AI/automation build itself.",
    imageSrc: "/images/team/mahesh.jpg",
    imageAlt: "Mahesh Pedapati, co-founder of Monorite",
  },
  {
    name: "Rahul Yellapu",
    role: "Co-founder",
    credentials: "4+ yrs · Java, Spring, AWS",
    focus: "Backend systems, microservices, and the cloud infrastructure everything runs on.",
    imageSrc: "/images/team/Rahul-1.jpg",
    imageAlt: "Rahul Yellapu, co-founder of Monorite",
    imagePosition: "object-top",
  },
];
