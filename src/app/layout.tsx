import type { Metadata } from "next";
import { Inter, Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baloo = Baloo_Da_2({
  variable: "--font-baloo",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Akhi Poultry Farm | Quality Poultry Feed & Supplies",
  description: "Akhi Poultry Farm provides 100% organic and halal poultry solutions in Shibganj, Chapainawabganj. Best quality chicken and poultry feed.",
  keywords: "Akhi Poultry Farm, Poultry farm in Bogra, Poultry feed supplier, Shibganj, Chapainawabganj",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Akhi Poultry Farm",
    "image": "https://akhipoultry.com/favicon.png",
    "@id": "https://akhipoultry.com",
    "url": "https://akhipoultry.com",
    "telephone": "+8801737451342",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shibganj",
      "addressLocality": "Chapainawabganj",
      "postalCode": "6310",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.6853,
      "longitude": 88.2721
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${baloo.variable} font-sans bg-[#050505] text-white antialiased relative`} suppressHydrationWarning>
        <script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }} />
      </body>
    </html>
  );
}
