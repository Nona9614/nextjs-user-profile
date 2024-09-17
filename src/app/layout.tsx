// Next JS
import type { Metadata } from "next";
// Styles
import "./globals.css";
// i18n
import { NextIntlClientProvider } from "next-intl";
// Services
import { getLocale, getMessages } from "next-intl/server";
import unpack from "@/utils/unpack";
import LangaugePicker, {
  LangaugePickerProps,
} from "@/components/LanguagePicker.tsx";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale =
    ((await getLocale()) as Locale) ?? process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  const messages = await getMessages();

  const locales = unpack<LangaugePickerProps["locales"]>(messages, "locales");

  const title = unpack<string>(messages, "index", "title");

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <main id="app">
            <header></header>
            <section className="content">
              <h1 className="title">{title}</h1>
              {children}
            </section>
            <footer>
              <LangaugePicker locales={locales} locale={locale} />
            </footer>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
