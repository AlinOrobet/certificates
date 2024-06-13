import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {useTranslations} from "next-intl";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CreateNewButton} from "@/components/create-new-button";

import {SecretariesForm} from "@/features/admin/components/secretary/secretaries-form";

type Props = {
  params: {
    locale: string;
  };
};

const SecretariesPage = ({params}: Props) => {
  const t = useTranslations();
  const cookieStore = cookies();

  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie || !sessionCookie.value) {
    return redirect(`/${params.locale}`);
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">{t("SECRETARIES")}</CardTitle>
          <CreateNewButton type="secretary" userSession={`JSESSIONID=${sessionCookie.value}`} />
        </CardHeader>
        <CardContent>
          <SecretariesForm userSession={`JSESSIONID=${sessionCookie.value}`} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretariesPage;
