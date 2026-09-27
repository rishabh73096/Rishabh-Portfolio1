import { DATA } from "@/data/resume";

/** Site-wide Person + WebSite JSON-LD, rendered once in the root layout. */
export function SiteStructuredData() {
  const sameAs = Object.values(DATA.contact.social)
    .map((s) => s.url)
    .filter((url) => !url.startsWith("mailto:"));

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    jobTitle: "Full Stack Developer",
    description: DATA.description,
    email: `mailto:${DATA.contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs,
    knowsAbout: [...DATA.skills],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DATA.name,
    url: DATA.url,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
