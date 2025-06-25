import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import AIChatController from "@/components/ai/AIChatController";

export const metadata: Metadata = {
  title: "Blog",
  description: "Arabic Blog",
};

export default function ArBlogLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ThemeProvider>
          <Header locale="ar" />
          {children}
          <AIChatController />
        </ThemeProvider>
      </body>
    </html>
  );
}
