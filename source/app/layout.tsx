import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "PP Engineering Works — Aircraft parts & ground equipment, Chandigarh",
  description:
    "Manufacturer of airframe hardware, transparencies, restraint systems and ground support equipment for AN-32, IL-76, Mi-8/Mi-17 and Chinook. Chandigarh, India.",
  // Under client review: the copy is transcribed from the brochure and not yet
  // approved, so the review build stays out of search results.
  robots: { index: false, follow: false },
  keywords: [
    "AN-32 spares",
    "IL-76 spares",
    "Mi-17 ground support equipment",
    "aircraft parts manufacturer India",
    "defence indigenisation Chandigarh",
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PP Engineering Works",
  slogan: "Partnering for defence excellence",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 707A, Phase II, Industrial Area",
    addressLocality: "Chandigarh",
    postalCode: "160002",
    addressCountry: "IN",
  },
  telephone: "+91 78372 20317",
  email: "p.pengineers21@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#catalogue"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-cyan focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to catalogue
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
