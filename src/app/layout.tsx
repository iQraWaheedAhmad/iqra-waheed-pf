import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iqra Waheed — Front-End Developer",
  description:
    "Iqra Waheed is a Front-End Developer based in Lahore, Pakistan, building responsive, component-driven web apps with React, Next.js, and Tailwind CSS.",
  metadataBase: new URL("https://iqrawaheed.dev"),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Iqra Waheed — Front-End Developer",
    description:
      "Building clean, responsive interfaces with React, Next.js, and Tailwind CSS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-bg text-text-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
