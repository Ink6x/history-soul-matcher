import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://history-soul-matcher.vercel.app',
  ),
  title: {
    default: "歴史人物 魂マッチング",
    template: "%s | 歴史人物 魂マッチング",
  },
  description:
    "あなたの写真を一枚アップロードすると、魂が呼応する歴史上の人物を AI が診断します。",
  openGraph: {
    title: "歴史人物 魂マッチング",
    description:
      "あなたの写真を一枚アップロードすると、魂が呼応する歴史上の人物を AI が診断します。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "歴史人物 魂マッチング",
    description:
      "あなたの写真を一枚アップロードすると、魂が呼応する歴史上の人物を AI が診断します。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
