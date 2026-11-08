import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext", "greek"],
});

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext", "greek"],
});

export const metadata: Metadata = {
  title: "CHM 2410 Exam 3 practice",
  description: "Practice questions with explanations for CHM 2410 Exam 3.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
