import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "John Doe — Full Stack Engineer",
    template: "%s | John Doe",
  },
  description:
    "Full Stack Engineer specializing in React, Node.js, and scalable systems. Available for FAANG-level roles.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "FAANG",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "John Doe Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};
