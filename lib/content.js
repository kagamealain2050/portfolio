// ─────────────────────────────────────────────────────────────
// Edit this file to personalise the portfolio.
// Stories, projects and testimonials are also stored in Neon
// (see db/schema.sql) — when the DB has rows they take priority.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "IRADUKUNDA Kagame Alain",
  shortName: "Alain",
  tagline: "Delivering efficient, scalable solutions to transform your tech vision into reality",
  roles: ["IT Engineer", "Web Developer", "Data Engineer"],
  email: "kagamealain2050@gmail.com",

  // Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local / Vercel to override.
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "250786188249",
    message: "Hello Alain, I found your portfolio and I'd like to talk about a project.",
  },

  // Used by the live clock + "Available now" badge
  timezone: "Africa/Windhoek",
  hours: { start: 8, end: 20 }, // local time you are usually available

  // Your portrait: replace public/profile.jpg (4:5 portrait works best).
  // `position` moves the focus point inside the frame (x% y%).
  photo: { src: "/profile.jpg", position: "50% 25%", alt: "Portrait of IRADUKUNDA Kagame Alain" },

  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    behance: "https://www.behance.net/",
  },
  nav: [
    { label: "About Me", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Our Service", href: "#services" },
  ],
  about: {
    text: "I'm {name}, an IT Engineer with 8+ years of experience in network architecture, cloud solutions, and cybersecurity. I'm focused on creating innovative, reliable systems that help businesses thrive in the digital world.",
    cards: [
      { icon: "web", text: "Build your quick web with Wordpress, Framer, and Webflow." },
      { icon: "code", text: "Understand programming languages such as Java, Python, Laravel, etc." },
    ],
  },
};

export const stats = [
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "", label: "Engineers led" },
  { value: 30, suffix: "%", label: "Network efficiency gain" },
];

export const tech = ["Java", "Python", "Laravel", "PHP", "React", "Next.js", "WordPress", "Webflow", "Framer", "AWS", "Docker", "Jenkins", "PostgreSQL", "Neon", "Vercel", "Linux", "Cybersecurity"];

export const stories = [
  {
    id: 1,
    title: "UI/UX Design & Lead IT Engineer – TechSolvers",
    period: "July 2024 - Present",
    description:
      "Improved network efficiency by 30% through optimized architecture. Led a team of 15 engineers on cybersecurity and system integration projects.",
    tags: ["UI/UX", "Cybersecurity"],
  },
  { id: 2, title: "UI/UX - Inoovate", period: "2022 - 2024", description: "Designed and shipped user-centred interfaces for internal tools and customer portals, cutting onboarding time by 40%.", tags: ["UI/UX", "Programming"] },
  { id: 3, title: "Web Developer Nexflow", period: "2020 - 2022", description: "Built responsive marketing sites and CMS-driven platforms with WordPress, Webflow and React.", tags: ["UI/UX", "Web Developer"] },
];

export const skills = [
  { icon: "gear", title: "Fast", text: "Optimal performance, ensuring quick load times and seamless user experience across all platforms." },
  { icon: "monitor", title: "Responsive", text: "Adaptive layouts designed to work flawlessly on any screen size, from mobile to desktop." },
  { icon: "bulb", title: "Intuitive", text: "Crafting user-friendly interfaces that prioritize ease of navigation and smooth interaction." },
  { icon: "rocket", title: "Dynamic", text: "Bringing web pages to life with interactive elements and modern animations." },
];

export const projects = [
  { id: 1, title: "Flight Booking App", description: "Mobile-first booking experience with live fares and seat selection.", tags: ["Mobile", "UI/UX"], kind: "phone", url: "#" },
  { id: 2, title: "Workflow Automation Platform", description: "Simplify your workflow, automate success — dashboard for teams.", tags: ["Next.js", "Automation"], kind: "laptop", url: "#" },
];

export const services = [
  { title: "Responsive Web Development", points: ["Custom WordPress development", "HTML5, CSS3, and React", "Cross-browser compatibility"] },
  { title: "DevOps & Automation", points: ["CI/CD pipelines with Jenkins, Docker", "Automated testing and monitoring", "Webflow automation"] },
  { title: "Cloud & Network Solutions", points: ["AWS / Azure architecture & migration", "Network design and security hardening", "Cost-optimised infrastructure"] },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "When we were looking to migrate our entire infrastructure to the cloud, we knew we needed a partner who could handle the process. {name} exceeded our expectations in every way. He understood the technical aspects—like our architecture on AWS—but also helped us build a clear migration strategy that minimized downtime for our business.",
    author: "Happy Client",
    role: "CTO, Cloud Migration Project",
  },
];
