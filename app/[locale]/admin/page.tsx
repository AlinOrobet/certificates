import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {useTranslations} from "next-intl";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {OverviewForm} from "@/features/admin/components/overview/overview-form";

type Props = {
  params: {
    locale: string;
  };
};

const AdminPage = ({params}: Props) => {
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
          <CardTitle className="text-xl line-clamp-1">{t("OVERVIEW")}</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewForm userSession={`JSESSIONID=${sessionCookie.value}`} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
