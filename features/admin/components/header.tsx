"use client";
import {useTranslations} from "next-intl";
import {HeaderLogo} from "./header-logo";
import {Navigation} from "./navigation";

import {UserProfile} from "@/components/user-profile/user-profile";
import {usePathname} from "next/navigation";

type Props = {
  locale: string;
  userSession: string;
};

export const Header = ({locale, userSession}: Props) => {
  const t = useTranslations();
  const data = {
    admin: {image: "/admin.jpg", name: "Alin", emailId: "alin.orobet@student.usv.ro"},
    student: {
      image: "/student.png",
      name: "Alin-Ciprian",
      emailId: "ciprian.orobet@student.usv.ro",
    },
    secretary: {image: "/secretary.png", name: "Alin", emailId: "orobet.alin@gmail.com"},
  };

  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const isStudent = pathname.includes("student");

  const typeOfUser = isAdmin ? "admin" : isStudent ? "student" : "secretary";
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo locale={locale} />
            <Navigation locale={locale} />
          </div>
          <UserProfile userSession={userSession} locale={locale} />
        </div>
        <div className="space-y-2 mb-4">
          <h2 className="text-2xl lg:text-4xl text-white font-medium">
            {t("WELCOME_BACK")} {data[typeOfUser].name} !
          </h2>
        </div>
      </div>
    </header>
  );
};
