import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {useTranslations} from "next-intl";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CreateNewButton} from "@/components/create-new-button";
import {CertificatesForm} from "@/features/secretary/components/certificates-form";

type Props = {
  params: {
    locale: string;
  };
};

const SecretaryPage = ({params}: Props) => {
  const t = useTranslations();
  const cookieStore = cookies();

  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie || !sessionCookie.value) {
    return redirect(`/${params.locale}`);
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">{t("CERTIFICATES")}</CardTitle>
            <div className="flex flex-col lg:flex-row items-center gap-2">
              <CreateNewButton type="raports" userSession={`JSESSIONID=${sessionCookie.value}`} />
            </div>
          </CardHeader>
          <CardContent>
            <CertificatesForm userSession={`JSESSIONID=${sessionCookie.value}`} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SecretaryPage;
