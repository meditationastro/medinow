import Script from "next/script";

export function SiteStructuredData({ siteUrl }: { siteUrl: string }) {
  // Keep this minimal and broadly correct. Page-level JSON-LD can add more specific schemas.
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Answerforself",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: [
          "https://facebook.com/meditationastro",
          "https://instagram.com/meditationastro",
          "https://twitter.com/meditationastro",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Answerforself",
        publisher: { "@id": `${siteUrl}#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/h/blogs?query={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <Script
      id="site-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
