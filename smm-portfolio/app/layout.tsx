import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Марго | SMM-маркетолог",
  description: "SMM-маркетолог в направлении психологии. Помогаю бизнесу расти через социальные сети.",
  keywords: ["SMM", "маркетолог", "психология", "социальные сети", "Казахстан"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
