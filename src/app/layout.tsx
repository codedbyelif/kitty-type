import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kitty Type – The Cutest Typing Speed Test",
  description:
    "Test your typing speed with the cutest Hello Kitty-themed typing game! Track your WPM, accuracy and compete on the leaderboard.",
  keywords: ["typing test", "WPM", "hello kitty", "typing speed", "keyboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
