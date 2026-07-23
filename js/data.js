/* ==========================================================================
   Site content — edit this file to update the website.
   No Figma needed: cards are generated from this data by js/site.js.

   Experience / link tiles take a `theme`:
     bg  — any CSS background (color or gradient) for the tile
     ink — "light" or "dark" text on that background
   Logos are transparent PNGs in images/logos/ (see scripts/extract-logos.py).
   To add a new company: drop a logo in images/logos/ and add an entry below.
   Set `hidden: true` to keep an entry without showing it.
   ========================================================================== */

window.SITE_DATA = {
  experience: [
    {
      company: "Tribe AI",
      role: "Head of Product",
      title: "Head of Product @ Tribe AI",
      logo: "images/logos/tribe.svg",
      theme: { bg: "#65D9EE", ink: "dark" },
      description:
        "Tribe AI designs and builds production AI solutions for Fortune 1000 companies. I lead an enterprise AI program spanning four product pods — core platform, client portal, knowledge infrastructure, and roadmap acceleration — with 30+ engineers, designers, and data scientists. Designed and shipped an AI-native deal execution platform for M&amp;A attorneys at a top-5 global law firm; early delivery and client confidence grew the account from $4M to nearly $20M. We are hiring!",
    },
    {
      company: "Anthropic",
      role: "MCP Consultant",
      title: "MCP Consultant @ Anthropic",
      logo: "images/logos/anthropic.png",
      theme: { bg: "#FF6719", ink: "dark" },
      description:
        "Built critical infrastructure for Anthropic's MCP offering and co-authored an MCP security guide. Full project details are confidential.",
    },
    {
      company: "Meta",
      role: "Llama API Consultant",
      title: "Llama API Consultant @ Meta",
      logo: "images/logos/meta.png",
      theme: { bg: "#0080F9", ink: "light" },
      description:
        "Led a developer experience and documentation effort for Meta's Llama API, driving improvements that impact millions of developers worldwide. Benchmarked Meta's offering against leading LLM providers to identify and close gaps in usability and onboarding. Provided guidance and team management for technical writers, to ensure those gaps were closed and met high standards.",
    },
    {
      company: "A.Team",
      role: "Product Lead",
      title: "Product Lead @ A.Team",
      logo: "images/logos/ateam.png",
      theme: { bg: "linear-gradient(135deg, #ACE8DB 0%, #EBC8D2 45%, #ABA2EF 100%)", ink: "dark" },
      description:
        "Contract Product Lead for Grindr via A.Team, driving monetization and CX for a platform serving 14M+ users globally. Generated $7M+ in annual subscription revenue with AI-powered features — profile recommendations, curation, in-app image and identity verification — and launched AI content moderation saving $1.2M+ annually.",
    },
    {
      company: "Woebot",
      role: "Senior Product Manager",
      title: "Senior Product Manager, Enterprise Lead @ Woebot Health",
      logo: "images/logos/woebot.png",
      theme: { bg: "#003087", ink: "light" },
      description:
        "Woebot provided chat-based mental health support through a mobile application, serving 1.5M+ users. As Enterprise Lead, generated $5M+ in revenue deploying AI-powered chatbots to health systems and payers, and more than doubled user renewals year over year by building Spotlight, an external analytics product.",
    },
    {
      company: "Amazon",
      role: "Technical Product Manager",
      title: "Technical Product Manager, AWS Infrastructure @ Amazon",
      logo: "images/logos/amazon.png",
      theme: { bg: "#FF9900", ink: "dark" },
      description:
        "Realized $52.5M in savings with ML-powered forecasting for data center build schedules. Drove another $10M in networking cost savings via automated workflows, and led adoption of scheduling platforms used by 5,000+ AWS operations staff worldwide.",
    },
    {
      company: "Nirvana",
      role: "First Product Manager",
      title: "First Product Manager @ Nirvana",
      logo: "images/logos/nirvana.png",
      theme: { bg: "#2C1E45", ink: "light" },
      description:
        "First product-hire at a seed-stage healthcare/fintech startup automating insurance, growing the user base to 7.5K+. Found product-market fit for API products — secured and scaled a $1B+ telehealth partnership and shipped insurance eligibility products driving $4M in ARR.",
    },
    {
      company: "Activant",
      role: "Investor",
      title: "Investor @ Activant",
      logo: "images/logos/activant.png",
      theme: { bg: "#DBDBDB", ink: "dark" },
      description:
        "Developed a proprietary software tool that identified 300+ investment targets, including two of the firm's largest investments for which I later served as Board Observer.",
    },
    {
      company: "Monster Roster",
      role: "Head of Data Science",
      title: "Head of Data Science @ Monster Roster",
      logo: "images/logos/mr.png",
      theme: { bg: "#FFFFFF", ink: "dark" },
      description:
        "Developed and scaled a statistical model for predicting MLB, NFL, and NBA daily fantasy sports scores, achieving a 55% overall win-rate that drove over 5,000 subscriptions and $250,000 in revenue.",
    },
    {
      company: "Harvard",
      role: "Statistics & Astrophysics",
      title: "Statistics & Astrophysics @ Harvard",
      logo: "images/logos/harvard.png",
      theme: { bg: "#A51C30", ink: "light" },
      description: "Bachelor's in Statistics and Astrophysics from Harvard College.",
    },
    {
      company: "OpenAI",
      role: "Consultant",
      title: "Consultant @ OpenAI",
      logo: "images/logos/openai.png",
      theme: { bg: "#FFFFFF", ink: "dark" },
      hidden: true,
      description:
        "Confidential project in progress. Co-authored a <a href='https://cookbook.openai.com/examples/partners/model_selection_guide/model_selection_guide' target='_blank' rel='noopener'><strong>joint model selection guide</strong></a> to help organizations efficiently deploy OpenAI models for real-world business impact.",
    },
    {
      company: "Microsoft",
      role: "Confidential",
      title: "Confidential",
      logo: "images/logos/microsoft.png",
      theme: { bg: "#000000", ink: "light" },
      confidential: true,
      hidden: true,
      description: "Confidential",
    },
  ],

  projects: [
    {
      title: "OpenAI Model Selection Guide",
      subtitle: "Co-author",
      href: "https://cookbook.openai.com/examples/partners/model_selection_guide/model_selection_guide",
      image: "images/projects/openai_author.png",
    },
    {
      title: "SitterBot",
      subtitle: "AI babysitting assistant",
      href: "https://sitterbot-info-hub.lovable.app",
      image: "images/projects/sitterbot.png",
    },
    {
      title: "Securing MCPs for the Autonomous Age",
      subtitle: "Co-author",
      // original tribe.ai URL is dead; archived copy keeps the piece readable
      href: "https://web.archive.org/web/2025/https://www.tribe.ai/applied-ai/securing-mcps-for-the-autonomous-age-your-ai-assistant-just-leaked-your-customer-database",
      image: "images/projects/anthropic_guide.png",
    },
    {
      title: "ESource Resume Screener",
      subtitle: "AI recruitment tool",
      href: "https://esource-screener.vercel.app",
      image: "images/projects/esource.png",
    },
    {
      title: "Forage",
      subtitle: "LinkedIn launch post",
      href: "https://www.linkedin.com/posts/share-7445448704918081536-gOTG?utm_source=share&utm_medium=member_desktop&rcm=ACoAABoV63wBpqUEfIH3mk0lYrSawqe5WPLERtE",
      image: "images/projects/forage.png",
    },
  ],

  links: [
    {
      name: "Calendar",
      tagline: "Meet with me!",
      href: "https://www.cal.com/tnoon",
      logo: "images/logos/calendar.png",
      theme: { bg: "#FFFFFF", ink: "dark" },
    },
    {
      name: "Resume",
      tagline: "The full story",
      href: "https://docs.google.com/document/d/1axLGwBemstmQHP_-UtcZ1BzlMT1qG5wgpcMYeQrzWKI/edit?usp=sharing",
      logo: "images/logos/resume.png",
      theme: { bg: "#FFFFFF", ink: "dark" },
    },
    {
      name: "LinkedIn",
      tagline: "Let's connect",
      href: "http://linkedin.com/in/tnoon",
      logo: "images/logos/linkedin.png",
      theme: { bg: "#FFFFFF", ink: "dark" },
    },
    {
      name: "YouTube",
      tagline: "Personal account",
      href: "https://www.youtube.com/channel/UCqG_H5pwLAxD9Jq0kmthuqw",
      logo: "images/logos/youtube.png",
      theme: { bg: "#FF0000", ink: "light" },
    },
  ],

  interests: [
    {
      alt: "Top 10 Movies",
      href: "https://abounding-mechanic-89d.notion.site/Movies-bde67a8c911a49d1b4101f13dec646a8",
      image: "images/interests/movies.png",
    },
    {
      alt: "Top 10 Albums",
      href: "https://music.apple.com/us/playlist/trevors-top-10-albums/pl.u-ePr9CzGYM9N",
      image: "images/interests/albums.png",
    },
    { image: "images/interests/image_7.JPG" },
    { image: "images/interests/image_8.jpeg" },
    { image: "images/interests/image_9.jpeg" },
    { image: "images/interests/image_10.jpeg" },
    { image: "images/interests/image_11.jpeg" },
    { image: "images/interests/image_12.jpeg" },
    { image: "images/interests/image_13.jpeg" },
    { image: "images/interests/image_14.jpeg" },
    { image: "images/interests/image_15.jpeg" },
    { image: "images/interests/image_16.jpeg" },
  ],
};
