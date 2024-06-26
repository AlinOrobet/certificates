import type {Metadata} from "next";
import {Inter} from "next/font/google";

import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {QueryProvider} from "@/components/providers/query-provider";
import {Toaster} from "@/components/ui/sonner";

import {cn} from "@/lib/utils";
import "./globals.css";
import {SheetProvider} from "@/components/providers/sheet-provider";
import {cookies} from "next/headers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  return (
    <html lang={locale}>
      <body className={cn("relative h-full antialiased font-sans", inter.className)}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <Toaster />
            <SheetProvider userSession={`JSESSIONID=${sessionCookie?.value}`} />
            <main className="relative h-full">{children}</main>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
