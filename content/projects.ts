import type { Project } from "@/lib/types";

// Images come from her portfolio deck and are PLACEHOLDERS — they were pulled
// out of the PDF at 150 PPI, so the smaller ones are soft. Juliana is sending
// hi-res originals; drop them in at the same paths and nothing else changes.

import yocoCounter from "@/public/work/yoco/counter.png";
import yocoNeoTouch from "@/public/work/yoco/neo-touch.png";
import yocoSketches from "@/public/work/yoco/counter-sketches.png";
import yoco3d from "@/public/work/yoco/counter-3d.png";
import yocoFamily from "@/public/work/yoco/hardware-family.png";

import nubankVision from "@/public/work/nubank/vision-phones.png";
import nubankCaixinhas from "@/public/work/nubank/caixinhas.png";
import nubankCardStates from "@/public/work/nubank/card-states.png";
import nubankFinal from "@/public/work/nubank/final-vision.png";

import ifoodWebsite from "@/public/work/ifood/website.png";
import ifoodRedesign1 from "@/public/work/ifood/redesign-1.png";
import ifoodRedesign2 from "@/public/work/ifood/redesign-2.png";
import ifoodRedesign3 from "@/public/work/ifood/redesign-3.png";

export const projects: Project[] = [
  {
    slug: "yoco",
    client: "Yoco",
    period: "2022–25",
    title: "From a payment screen to a hardware ecosystem",
    arc: ["Interaction", "Industrial design", "Portfolio strategy"],
    role: "Payments tribe Design Manager and Product Designer. Hands-on throughout — managed two designers and coached a third in UI design.",
    summary:
      "Yoco serves about 200,000 small businesses in South Africa. My scope grew as each project exposed a larger problem: from how a payment works, to how the device works, to how the hardware portfolio should evolve.",
    media: [
      { src: yocoCounter, alt: "Yoco Counter point-of-sale device", span: 2 },
      { src: yocoNeoTouch, alt: "Neo Touch payment device showing the sign-up screen", span: 2 },
      { src: yocoSketches, alt: "Sketch and form exploration for Counter", span: 1 },
      { src: yoco3d, alt: "Prototype and 3D studies of the Counter housing", span: 1 },
      { src: yocoFamily, alt: "The Yoco hardware family lined up together", span: 2 },
    ],
    metrics: [
      { value: "17,500+", label: "Neo Touch devices active", note: "by 2025 · Yoco's most stable device" },
      { value: "1,100+", label: "merchants on Counter", note: "Yoco's largest launch of 2025" },
      { value: "Adopted", label: "into the 2026 roadmap", note: "shaping the next hardware cycle" },
    ],
    blocks: [
      {
        heading: "Screen",
        body: "Payments had to work for two people at once: a merchant processing hundreds of transactions and a customer on an unfamiliar four-inch screen. I made Neo Touch the pilot for Yoco's new design system — and challenged one of its rules when it didn't survive the physical context. People sign with their thumbs, so the pattern had to follow the interaction.",
      },
      {
        heading: "Object",
        body: "Yoco was moving from card machines to a full countertop setup with no industrial designer on the team and tooling already booked. I brought my industrial design background to it, exploring device architecture, proportions, and the relationship between Counter and Neo Touch while designing the interface alongside it.",
      },
      {
        heading: "System",
        body: "Yoco had strong devices but no system for merchants to grow across them. I mapped the portfolio against the market and our technical capabilities, and presented a vision to C-level leaders: modular hardware, circular services, new business models. Supplier visits in China expanded the modular exploration.",
      },
    ],
    diagram: {
      title: "One hardware family, designed as a service, that grows with the business",
      centre: "Merchant's business",
      devices: [
        "Pocket reader",
        "Handheld POS",
        "Countertop pay",
        "Point of sale",
        "Customer screen",
      ],
      services: [
        "Payments",
        "Printer",
        "Scanner",
        "Onboarding and help",
        "Upgrade path",
        "Dock",
        "Covers",
        "POS software",
      ],
      lifecycle: ["Rent or resell", "Use", "Return", "Repair"],
    },
    principle: "How can Yoco's hardware grow with the merchant, instead of being replaced?",
  },

  {
    slug: "nubank",
    client: "Nubank",
    period: "2020–21",
    title: "From an undefined future to a shared product vision",
    arc: ["Product vision", "Org. alignment", "0–1 product"],
    role: "Staff Product Designer. Co-led the vision and guided two designers through the work; created and tested the original Caixinhas concept.",
    summary:
      "Nubank aimed to build the world's best financial app. The new home screen was a first step, but its destination was undefined — and business units were planning on their own. Leadership needed one north star for 2021–22: a directional prototype, not a feature list.",
    media: [
      { src: nubankVision, alt: "Five phone screens showing the app vision evolving across research waves", span: 4 },
      { src: nubankCaixinhas, alt: "Caixinhas savings reserves in the Nubank app", span: 2 },
      { src: nubankCardStates, alt: "Credit card states and variations explored for the new home", span: 2 },
      { src: nubankFinal, alt: "The final vision direction for the app home screen", span: 1 },
    ],
    metrics: [
      { value: "12.2M", label: "customers using Caixinhas", note: "Nubank · June 2024" },
      { value: "R$25B", label: "invested in Caixinhas", note: "December 2023" },
      { value: "70%", label: "of monthly investors started there", note: "Nubank · 2024" },
    ],
    blocks: [
      {
        heading: "The mandate",
        body: "After we presented the new home, Nubank's advisors asked what the vision was for the two years beyond it. Research across six personas had surfaced seven unmet needs that went past any single product, while investments, loans and new services competed for space with no shared model for how they should coexist.",
      },
      {
        heading: "The vision",
        body: "Prototypes turned competing perspectives into shared decisions: listen, synthesise into one cross-product prototype, test and challenge, decide, align. Three workshops, four sprint waves, 32 customer interviews, and recurring leadership reviews — each research wave changed the next question.",
      },
      {
        heading: "Caixinhas",
        body: "Caixinhas lets people set money aside in reserves. I created and tested the original concept: organise money around personal goals before introducing investment choices. Debt control and emergency savings came before investing felt relevant, so names, images and progress made money set aside tangible.",
      },
    ],
    principle: "Start with the customer's goal. Let the financial product work behind it.",
  },

  {
    slug: "ifood",
    client: "iFood",
    period: "2018–19",
    title: "From a channel expected to fade away to one worth keeping",
    arc: ["Reframe", "Product direction", "Growth"],
    role: "Design lead for the website squad, Senior Product Designer. Led the redesign from discovery through launch, across the tribes that owned each stage of the journey.",
    summary:
      "iFood had spent more than a year redesigning its new app on the assumption that customers would move to mobile and the website would fade away. Meanwhile 7.3M people were still using the web every month, and 61.7% of them dropped at the start of the journey.",
    media: [
      { src: ifoodWebsite, alt: "The redesigned iFood website home page", span: 2 },
      { src: ifoodRedesign1, alt: "Search and filtering in the redesigned website", span: 1 },
      { src: ifoodRedesign2, alt: "Coupons brought into the web experience", span: 1 },
      { src: ifoodRedesign3, alt: "Dish detail and ordering options", span: 2 },
    ],
    metrics: [
      { value: "31.7%", label: "website conversion after the redesign", note: "up from about 20%" },
      { value: "+19.4%", label: "new-customer conversion on mobile web", note: "separate landing-page release" },
      { value: "−88%", label: "landing-page drop-off", note: "separate landing-page release" },
    ],
    blocks: [
      {
        heading: "The assumption",
        body: "The strategy was to bet on the new app only. Web received little investment for over a year, and had become an outdated version of iFood — the layout, the design system, and the coupons customers already expected were all missing.",
      },
      {
        heading: "The reframe",
        body: "The Product Manager surfaced that web traffic stayed high; I took that into research. People weren't using the web by accident, they were using it at work. 20 interviews and 6.5K+ poll responses in 24 hours: the browser let them order without picking up the phone, kept it discreet, and let them track delivery while they kept working.",
      },
      {
        heading: "The response",
        body: "I redesigned around why people chose the channel rather than around the app: make ordering at work fast, bring coupons into web so its customers got a no less valuable iFood, and show useful options earlier to cut the time between arriving and finding a restaurant.",
      },
    ],
    chart: {
      question: "On-site poll: why do you order on the website?",
      note: "6,500+ responses in 24 hours",
      rows: [
        { label: "Don't want to use phone memory on apps", value: 46.1, emphasis: true },
        { label: "Prefer to order on the website", value: 26.6, emphasis: true },
        { label: "Don't order food very often", value: 18.5 },
        { label: "Other reason", value: 6.8 },
        { label: "Don't want to use data to download another app", value: 3.7 },
      ],
    },
    principle: "Don't replicate the app. Design for why customers choose the channel.",
  },
];
