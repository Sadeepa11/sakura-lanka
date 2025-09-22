import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import I18nProvider from "../../components/I18nProvider";
import { getDictionary } from "../../lib/dictionary";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }];
}
export default async function LocaleLayout(context) {
  const { children } = context;
  const { locale } = await context.params; // Next 15: await params
  const messages = await getDictionary(locale);
  return (
    <html lang={locale}>
      {" "}
      <body>
        {" "}
        <I18nProvider locale={locale} messages={messages}>
          {" "}
          <Header /> <main className="min-h-[70vh]">
            {children}
          </main> <Footer />{" "}
        </I18nProvider>{" "}
      </body>{" "}
    </html>
  );
}
