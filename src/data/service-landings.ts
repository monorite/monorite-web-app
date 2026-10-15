export interface LandingPoint {
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  href?: string;
  hrefLabel?: string;
}

export interface LandingExample {
  title: string;
  description: string;
}

export interface LandingStep {
  title: string;
  description: string;
}

export interface LandingProject {
  name: string;
  status: string;
  summary: string;
  href: string;
  linkLabel: string;
}

export interface LandingLink {
  href: string;
  label: string;
  description: string;
}

export interface ServiceLanding {
  slug: string;
  path: string;
  schemaName: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  badge: string;
  h1: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  servicesTitle: string;
  servicesIntro: string;
  services: LandingPoint[];
  examplesTitle: string;
  examplesIntro: string;
  examples: LandingExample[];
  processTitle: string;
  processIntro: string;
  process: LandingStep[];
  workTitle: string;
  workIntro: string;
  projects: LandingProject[];
  related: LandingLink[];
  faqs: { q: string; a: string }[];
  finalTitle: string;
  finalDescription: string;
  /** Facts for the chat assistant. Status language matches the page. */
  knowledge: string;
}

const aiSolutions: ServiceLanding = {
  slug: "ai-solutions",
  path: "/services/ai-solutions",
  schemaName: "AI Solutions",
  seoTitle: "AI Chat, Voice, and Workflow Automation",
  seoDescription:
    "AI chatbots, voice receptionists, and workflow automation for local businesses. Built around your services and tools, with a person still in the loop.",
  keywords: [
    "AI chatbot for business",
    "AI voice receptionist",
    "lead follow-up automation",
    "workflow automation",
  ],
  badge: "AI Solutions",
  h1: "AI for the chats, calls, and follow-ups your team keeps losing",
  description:
    "Website chat, a voice receptionist, and follow-up that starts from the details you actually need. It connects to the tools you already use, and it hands a person the cases it should not decide.",
  primaryCta: "Discuss Your AI Project",
  secondaryCta: "Explore Our Work",
  secondaryHref: "/#work",
  servicesTitle: "What we put AI to work on",
  servicesIntro:
    "Each of these is a specific job, not a blanket promise that software will run the business. We start from the enquiry, the call, or the handoff that is slipping today.",
  services: [
    {
      title: "AI chatbots for websites and customer support",
      problem:
        "People ask the same questions after hours, and a contact form is the only thing waiting for them.",
      solution:
        "A chat assistant trained on your services, hours, and policies. It answers from that material and keeps the conversation for your team.",
      benefit:
        "A visitor gets a useful reply while you are with a customer, and your team can see what was already asked.",
      href: "/services/ai-assistants",
      hrefLabel: "AI Assistants",
    },
    {
      title: "AI voice agents and receptionists",
      problem:
        "The phone rings while you are on a job. After hours, it goes to voicemail.",
      solution:
        "A voice assistant that takes the call, asks what is going on, and passes on a clear message. Our phone receptionist for trades is in pilot. It separates an emergency from a routine booking, says it is an AI assistant, and transfers urgent jobs to a person.",
      benefit:
        "More calls end with a name, a problem, and a next step, instead of a missed ring.",
      href: "/ai-receptionist",
      hrefLabel: "See the phone receptionist pilot",
    },
    {
      title: "Business workflow automation",
      problem:
        "The same details get typed into the inbox, the spreadsheet, and the job system.",
      solution:
        "Automations that carry a lead, a booking, or an invoice from one tool to the next, using the systems you already run.",
      benefit:
        "Fewer details re-entered by hand, and a handoff your team can see.",
      href: "/services/workflow-systems-automation",
      hrefLabel: "Workflow automation",
    },
    {
      title: "Lead qualification and follow-up",
      problem:
        "An enquiry arrives as “call me,” and nobody has time to ask what the job actually is.",
      solution:
        "The assistant asks for the work, the place, and the timing, then sends that to you. A follow-up can go out when a quote has had no reply.",
      benefit:
        "The first conversation starts from the facts, and quiet leads are less likely to be forgotten.",
    },
    {
      title: "AI integrations with your software and APIs",
      problem:
        "The assistant has the answer, then someone still copies the booking into another system.",
      solution:
        "Where your calendar, CRM, or other software exposes a stable API, we connect the assistant so the enquiry lands in that system.",
      benefit:
        "The result shows up where your team already works, when the other tool allows the connection.",
      href: "/services/business-software",
      hrefLabel: "Business software",
    },
  ],
  examplesTitle: "Where this is useful",
  examplesIntro:
    "These are the situations we build for. Named work on this site is limited to the pilot and the assistant running on our own homepage.",
  examples: [
    {
      title: "A trade, after hours",
      description:
        "A burst pipe at night is a different call from a quote for next week. The phone receptionist pilot is built to tell those apart and to reach a person for the urgent one.",
    },
    {
      title: "A clinic or a local practice",
      description:
        "Hours, whether you are taking new patients, and how to book. The chat can answer from your own pages and take a name for the front desk.",
    },
    {
      title: "A quote that arrives with no detail",
      description:
        "Before anyone calls back, the assistant can ask what the job is, where it is, and when it is needed.",
    },
    {
      title: "A company that is growing past one inbox",
      description:
        "The same questions get answered from your documents, and the lead can be written into the CRM or job system you already use.",
    },
  ],
  processTitle: "How an AI project actually starts",
  processIntro:
    "We do not switch a business over to an unattended assistant. The work is to find the repetitive part, keep a person on the rest, and test it before customers rely on it.",
  process: [
    {
      title: "Discovery",
      description:
        "We look at the calls, messages, and handoffs that currently slip, and at the tools those details have to reach.",
    },
    {
      title: "Boundaries",
      description:
        "We agree what the assistant may answer from your material, and what must go to a person. Emergencies and anything sensitive stay with your team.",
    },
    {
      title: "Build",
      description:
        "We train it on your services, hours, and policies, then connect the calendar, CRM, or inbox that should receive the result.",
    },
    {
      title: "Test and launch",
      description:
        "We run real questions through it and fix the gaps before it faces customers. After launch, the people who built it stay available as the business changes.",
    },
  ],
  workTitle: "Work you can look at",
  workIntro:
    "Two things on this site are real and current. The phone receptionist is a pilot with trades businesses. The chat on our homepage is a working example of the assistant we build, trained on Monorite’s own services. Neither is a finished product for every business.",
  projects: [
    {
      name: "AI phone receptionist",
      status: "Pilot",
      summary:
        "Answers after-hours calls for trades, separates an emergency from a routine booking, and says up front that the caller is speaking with an AI assistant.",
      href: "/ai-receptionist",
      linkLabel: "Read how the pilot works",
    },
    {
      name: "The assistant on this website",
      status: "Working example",
      summary:
        "The chat on the Monorite homepage is the same kind of assistant we build for a client, answering from this site’s services and projects.",
      href: "/",
      linkLabel: "Talk to it on the homepage",
    },
  ],
  related: [
    {
      href: "/services/ai-assistants",
      label: "AI Assistants",
      description: "Chat, voice, and assistants trained on your own documents.",
    },
    {
      href: "/services/workflow-systems-automation",
      label: "Workflow automation",
      description: "The handoffs between the tools you already run.",
    },
    {
      href: "/services/ongoing-support",
      label: "Ongoing support",
      description: "Direct access to the people who built the system.",
    },
    {
      href: "/services/business-software",
      label: "Business software",
      description: "The website, CRM, or app the assistant needs to write into.",
    },
  ],
  faqs: [
    {
      q: "What can a chatbot or voice agent do for a local business?",
      a: "It can answer from your services, hours, and policies, and it can collect the details your team needs before calling back. Complex, urgent, or sensitive requests go to a person. It is not an unattended replacement for your staff.",
    },
    {
      q: "Can it connect to the software we already use?",
      a: "Yes, when that software has an API or another stable way to receive data. We check that during discovery. We do not claim that every product can be connected.",
    },
    {
      q: "How does implementation work?",
      a: "We start with the enquiries that are slipping, agree what the assistant may handle, build it on your real material, test it with real questions, and then launch. There is no single timeline. The size of the job depends on how many tools and exceptions are involved.",
    },
    {
      q: "Who supports it after launch?",
      a: "You deal with the people who built it, not a separate support queue. As your hours, services, or policies change, the assistant has to change with them. That ongoing access is described on our Ongoing Support page.",
    },
  ],
  finalTitle: "Tell us which enquiries should be handled first.",
  finalDescription:
    "We will say whether a chat assistant, a voice receptionist, or a simpler workflow is the right place to start.",
  knowledge:
    "AI Solutions is a service page at /services/ai-solutions. It covers website chatbots, AI voice agents and receptionists, business workflow automation, lead qualification and follow-up, and AI integrations with existing software and APIs. The AI phone receptionist is in pilot and is described at /ai-receptionist. The chat on the Monorite homepage is a working example trained on this site. Do not describe these as fully autonomous, and do not promise savings, revenue, or accuracy figures.",
};

const businessSoftware: ServiceLanding = {
  slug: "business-software",
  path: "/services/business-software",
  schemaName: "Business Software",
  seoTitle: "Custom Business Software and Websites",
  seoDescription:
    "Websites, mobile apps, CRMs, and operations software built around how a business works. Includes shipped work such as Cable Pulse CRM, plus custom builds.",
  keywords: [
    "custom business software",
    "custom CRM",
    "business website",
    "billing software",
    "attendance management",
  ],
  badge: "Business Software",
  h1: "Software built around how your business already works",
  description:
    "Websites, mobile apps, CRMs, and the systems behind billing, attendance, a school day, or a restaurant service. We study the workflow first. The software follows it.",
  primaryCta: "Build Your Business Software",
  secondaryCta: "Explore Our Work",
  secondaryHref: "/#work",
  servicesTitle: "Software we design around a workflow",
  servicesIntro:
    "Some of this is work we have already shipped. The rest is custom development for a specific business. The status is stated on each example below.",
  services: [
    {
      title: "Business websites and custom websites",
      problem:
        "Customers cannot find the business, or the site does not give them a clear way to enquire.",
      solution:
        "A fast site, readable on a phone, structured so the pages match what people search for and so an enquiry reaches you.",
      benefit:
        "A public front door for the business, connected to the way you already reply.",
      href: "/services/website-online-presence",
      hrefLabel: "Website and online presence",
    },
    {
      title: "Mobile applications",
      problem:
        "The work happens on site, and the system that records it stays at a desk.",
      solution:
        "Android apps for the job in the field, including offline use where the connection is unreliable. Cable Pulse CRM is one shipped example, built for cable operators and live on Google Play.",
      benefit:
        "The record is made where the work happens, then available when the person is back online.",
      href: "/work/cable-pulse-crm",
      hrefLabel: "Cable Pulse CRM",
    },
    {
      title: "CRM systems",
      problem:
        "Leads and customers live across inboxes, calls, and notebooks.",
      solution:
        "A CRM shaped around your pipeline: who enquired, what they need, and who is meant to follow up.",
      benefit:
        "One place to see the work that still needs a reply.",
    },
    {
      title: "School management software",
      problem:
        "Admissions, attendance, fees, and messages to parents sit in separate spreadsheets.",
      solution:
        "School software built for one school’s records. This is custom development for that school. We do not publish it as a product you can sign up for.",
      benefit:
        "The lists a school already keeps can live in one system, scoped to how that school actually runs.",
    },
    {
      title: "Restaurant management software",
      problem:
        "The menu, the floor, and the day’s numbers are split across paper and apps that do not share data.",
      solution:
        "Operations software for a restaurant’s service and the records behind it, built for that restaurant. Kebab Knights, in our work, is a live marketing website with a menu. It is a website project, not a restaurant management system.",
      benefit:
        "Orders, the menu, and the day’s record can be designed as one workflow when that is the brief.",
      href: "/work/kebab-knights-website",
      hrefLabel: "Kebab Knights website",
    },
    {
      title: "Worker and attendance management",
      problem:
        "Who arrived, and for how long, gets reconstructed at the end of the week.",
      solution:
        "Attendance and worker records built around your sites or shifts. This is a custom system. The site does not offer a finished Worker Management App as a product.",
      benefit:
        "Attendance can be recorded as the day happens, in the shape of your own shifts.",
    },
    {
      title: "Billing and business management",
      problem:
        "Invoices, dues, and the day’s cash depend on one person’s notebook.",
      solution:
        "Billing and day-to-day management around your plans, payments, and expenses. Cable Pulse CRM does this for cable and internet operators and is live on Google Play. A billing system for a different trade is a separate build.",
      benefit:
        "Collections, dues, and the day’s position can be read without rebuilding them from paper.",
      href: "/work/cable-pulse-crm",
      hrefLabel: "Cable Pulse case study",
    },
    {
      title: "Custom software and AI integrations",
      problem:
        "An off-the-shelf tool covers most of the job, and the last part is still done by hand. Or an assistant needs to write into the system your team uses.",
      solution:
        "Custom software for the gap, and an AI assistant connected to it where the system has an API.",
      benefit:
        "The tool matches the workflow, and an enquiry can land inside it instead of in a side channel.",
      href: "/services/ai-solutions",
      hrefLabel: "AI Solutions",
    },
  ],
  examplesTitle: "Operational problems this software is for",
  examplesIntro:
    "The first three are problems behind projects we have shipped. The last three are the kind of workflow a custom build is scoped to. They are not claims about a product already for sale.",
  examples: [
    {
      title: "Subscribers and dues in a notebook",
      description:
        "Local cable operators were tracking customers and payments by hand, village by village. Cable Pulse CRM is the Android app built for that, and it is live on Google Play.",
    },
    {
      title: "A practice with no site a client can read",
      description:
        "Vista Legal needed a public site for seven practice areas. That website is live.",
    },
    {
      title: "A shop people have to find from their phone",
      description:
        "Kebab Knights needed a menu, photos, and a location for late-night customers. That marketing website is live. It does not run the kitchen or the tables.",
    },
    {
      title: "Attendance filled in from memory",
      description:
        "Sites and shifts where arrival is written up later. Worker and attendance software for that pattern is custom development, scoped to the business.",
    },
    {
      title: "A school’s lists in different files",
      description:
        "Admissions, fees, attendance, and parent messages kept apart. School software for that is built for the school that asks for it.",
    },
    {
      title: "A service business that outgrows the spreadsheet",
      description:
        "Quotes, jobs, and invoices that only one person can reconcile. A CRM or billing system for that is designed around those steps.",
    },
  ],
  processTitle: "How a software build runs",
  processIntro:
    "The sequence is the same whether the job is a website or an operations system. The time is not. We estimate after discovery, once the workflow is clear.",
  process: [
    {
      title: "Discovery",
      description:
        "We sit with the way the work happens now: who records it, which tools are already in use, and which steps are still on paper.",
    },
    {
      title: "Design",
      description:
        "Screens and flows follow that workflow. A field app, a front desk, and a customer website are designed for the person who will actually use them.",
    },
    {
      title: "Development",
      description:
        "We build the system, including the connections to tools that have a stable API, and the offline behaviour a field app needs.",
    },
    {
      title: "Testing",
      description:
        "We run the real tasks through it: taking a payment, marking attendance, sending an enquiry. Gaps get fixed before launch.",
    },
    {
      title: "Launch",
      description:
        "The system goes live with the people who built it still on the other end. Changes after launch are part of ongoing support, not a new introduction.",
    },
  ],
  workTitle: "Shipped projects",
  workIntro:
    "These three are live. School management, restaurant operations, and worker attendance, described above, are custom development services. They are not listed here because we are not presenting them as finished products.",
  projects: [
    {
      name: "Cable Pulse CRM",
      status: "Live on Google Play",
      summary:
        "An Android app for cable and internet operators: subscribers by village, payments, dues, and a daily view of collections. It works offline and syncs later.",
      href: "/work/cable-pulse-crm",
      linkLabel: "Read the case study",
    },
    {
      name: "Vista Legal",
      status: "Live website",
      summary:
        "A website for a Bengaluru advocacy practice, covering seven practice areas, built and deployed.",
      href: "/work/vista-legal-website",
      linkLabel: "Read the case study",
    },
    {
      name: "Kebab Knights",
      status: "Live website",
      summary:
        "A marketing site for a Melbourne kebab shop: menu, photos, and location. It is a website, not restaurant management software.",
      href: "/work/kebab-knights-website",
      linkLabel: "Read the case study",
    },
  ],
  related: [
    {
      href: "/services/custom-business-software",
      label: "Custom business software",
      description: "Portals and dashboards built around the operation.",
    },
    {
      href: "/services/website-online-presence",
      label: "Website and online presence",
      description: "The public site, structured to be found and to receive an enquiry.",
    },
    {
      href: "/services/ai-solutions",
      label: "AI Solutions",
      description: "Chat, voice, and follow-up connected to the system you run.",
    },
    {
      href: "/services/ongoing-support",
      label: "Ongoing support",
      description: "The same people, after the system is live.",
    },
  ],
  faqs: [
    {
      q: "What does a typical scope include?",
      a: "Scope follows the workflow. A marketing website, a field app, and a full operations system are different sizes of work. Discovery is where we write down which screens, records, and connections are in the first version, and which are later.",
    },
    {
      q: "How long does a build take?",
      a: "We give a timeline after discovery, not before. Vista Legal’s website took about two weeks. That figure is for that project. Custom operations software takes longer because the workflow, the connections, and the testing are part of the job.",
    },
    {
      q: "How custom is the software?",
      a: "It is built around how your team already works. You are not asked to rebuild the business to fit a generic template. The existing custom-software work on this site is owned by the client, without a lock-in to a rigid platform.",
    },
    {
      q: "What happens about maintenance?",
      a: "After launch you can keep a direct line to the people who built the system. That is the Ongoing Support service: adjustments as the business changes, not a ticket queue you have to re-explain yourself to.",
    },
    {
      q: "Can it connect to the tools we already use, including AI?",
      a: "Where the other system has an API or a stable way to exchange data, we connect it. An AI assistant can write an enquiry into that system on the same condition. We confirm the connection during discovery rather than assuming every product supports it.",
    },
  ],
  finalTitle: "Tell us the workflow the software has to fit.",
  finalDescription:
    "We will look at how the work happens today, then tell you what a website, an app, or a custom system would involve.",
  knowledge:
    "Business Software is a service page at /services/business-software. It covers business websites, mobile apps, CRM systems, school management software, restaurant management software, worker and attendance management, billing and business management, and custom software with AI integrations. Cable Pulse CRM is a shipped Android app, live on Google Play, for cable and internet operators. Vista Legal and Kebab Knights are live websites. Kebab Knights is a marketing website, not restaurant operations software. School management, restaurant operations software, and worker attendance are custom development services. There is no finished Worker Management App published as a product on this site. Do not imply every example is a mature commercial product.",
};

export const serviceLandings: ServiceLanding[] = [aiSolutions, businessSoftware];

export const aiSolutionsLanding = aiSolutions;
export const businessSoftwareLanding = businessSoftware;
