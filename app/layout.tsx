// app/layout.tsx
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import NProgress from "nprogress"; // progress bar
import 'nprogress/nprogress.css'; // global style for nprogress

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { ThemeProvider } from "./components/layouts/theme-provider";
import { Box, Theme } from "@radix-ui/themes";
import { getFontClassName } from "./fonts/options";
import ProgressBar from "./templates";

export const metadata: Metadata = {
  title: "Home",
  description: "Portfolio",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const locale = await getLocale();
  const fontClass = await getFontClassName();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontClass} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Theme>
            <NextIntlClientProvider messages={messages}>
              <Box>
                <ProgressBar />
                <div className="container-fluid mx-auto px-4 lg:px-18">
                  {children}
                </div>
              </Box>
            </NextIntlClientProvider>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
