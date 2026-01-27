import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "抛硬币 - Coin Flip",
  description: "一个有趣的抛硬币小程序",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
