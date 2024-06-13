import {cookies} from "next/headers";
import {useTranslations} from "next-intl";

import {GradientWrapper} from "@/components/gradient-wrapper";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {StudentForm} from "@/features/student/components/student-form";
import {UserProfile} from "@/components/user-profile/user-profile";
import {redirect} from "next/navigation";

type Props = {
  params: {
    locale: string;
  };
};

const StudentPage = ({params}: Props) => {
  const t = useTranslations();
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie || !sessionCookie.value) {
    return redirect(`/${params.locale}`);
  }

  return (
    <GradientWrapper className="flex justify-center items-center relative">
      <div className="absolute top-[2%] right-[2%] z-10 flex flex-row items-center gap-x-2">
        <UserProfile userSession={`JSESSIONID=${sessionCookie.value}`} locale={params.locale} />
      </div>
      <Card className="lg:border-none lg:shadow-none w-full max-w-[450px] mx-auto flex flex-col relative min-h-[350px] justify-between">
        <CardHeader className="pt-10">
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <CardTitle className="text-center">{t("STUDENT_FORM_TITLE")}</CardTitle>
            <CardDescription className="text-center">
              {t("STUDENT_FORM_DESCRIPTION")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <StudentForm userSession={`JSESSIONID=${sessionCookie.value}`} />
        </CardContent>
      </Card>
    </GradientWrapper>
  );
};

export default StudentPage;
