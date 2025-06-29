import React from "react";
import "@/app/globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import AIChatController from "@/components/ai/AIChatController";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* Default to English for non-localized blog */}
      <body>
        <ThemeProvider>
          <Header locale="en" /> {/* Pass a default locale for the header */}
          {children}
          <AIChatController />
        </ThemeProvider>
      </body>
    </html>
  );
}
