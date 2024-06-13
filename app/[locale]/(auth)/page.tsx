import Link from "next/link";
import Image from "next/image";
import {useTranslations} from "next-intl";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {LanguageSelect} from "@/components/language-select";

type Props = {
  params: {locale: string};
};

export default function HomePage({params}: Props) {
  const t = useTranslations();
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
      <div className="absolute top-[2%] right-[2%] z-10 flex flex-row items-center gap-x-2">
        <LanguageSelect locale={params.locale} />
      </div>
      <div className="order-2 relative bg-background">
        <div className="absolute top-[-30%] lg:top-0 left-0 right-0 px-4 flex justify-center items-center lg:h-full">
          <Card className="w-full max-w-[450px] mx-auto lg:shadow-none bg-background border-none">
            <CardHeader>
              <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                <CardTitle className="text-center">{t("WELCOME_BACK")}</CardTitle>
                <CardDescription className="text-center ">{t("LOGIN_DESCRIPTION")}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-8">
              <Button asChild className="w-full">
                <Link href="http://localhost:8080/login/google">{t("LOGIN")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-blue-700 flex items-center justify-center relative h-full">
        <Image
          src="/logo.svg"
          height={60}
          width={60}
          alt="Logo"
          className="absolute -mt-20 lg:mt-0"
        />
      </div>
    </div>
  );
}
