export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nucielo.io/#organization",
      name: "NuCielo ICT B.V.",
      legalName: "NuCielo ICT B.V.",
      url: "https://nucielo.io/",
      description:
        "NuCielo ICT B.V. is the Netherlands-registered company operating the NeotixHQ brand.",
      brand: { "@id": "https://neotixhq.com/#brand" },
    },
    {
      "@type": "Brand",
      "@id": "https://neotixhq.com/#brand",
      name: "NeotixHQ",
      url: "https://neotixhq.com/",
      description: "NeotixHQ is a brand operated by NuCielo ICT B.V.",
    },
    {
      "@type": "WebSite",
      "@id": "https://neotixhq.com/#website",
      name: "NeotixHQ",
      url: "https://neotixhq.com/",
      publisher: { "@id": "https://nucielo.io/#organization" },
      about: { "@id": "https://neotixhq.com/#brand" },
      mentions: { "@id": "https://meridian.neotixhq.com/#software" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://meridian.neotixhq.com/#software",
      name: "Meridian — AI History Explorer",
      url: "https://meridian.neotixhq.com/",
      publisher: { "@id": "https://nucielo.io/#organization" },
      description:
        "Meridian is a local-first AI History Explorer by NeotixHQ for importing, analyzing, searching, reading, and exporting ChatGPT, Claude, and Gemini conversation history.",
    },
  ],
};
