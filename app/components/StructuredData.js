export const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Mesoud",
  url: "https://your-portfolio-url.com",
  image: "https://your-portfolio-url.com/profile.jpg",
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Tech Innovations Inc.",
  },
  sameAs: [
    "https://linkedin.com/in/yourprofile",
    "https://github.com/yourprofile",
    "https://twitter.com/yourprofile",
  ],
  description:
    "Passionate Full Stack Developer with 5+ years of experience creating modern web applications using React, Next.js, and Node.js.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "USA",
  },
  email: "hello@example.com",
  telephone: "+1-123-456-7890",
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mohammed Mesoud Portfolio",
  url: "https://your-portfolio-url.com",
  description:
    "Personal portfolio showcasing projects, skills, and experience of Mohammed Mesoud, a Full Stack Developer.",
  author: {
    "@type": "Person",
    name: "Mohammed Mesoud",
  },
};

export const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://your-portfolio-url.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://your-portfolio-url.com#projects",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "About",
      item: "https://your-portfolio-url.com#about",
    },
  ],
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}
