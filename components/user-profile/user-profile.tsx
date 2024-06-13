"use client";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {LogOut, Settings, User} from "lucide-react";
import {FcGoogle} from "react-icons/fc";
import {SelectLanguages} from "./select-language";

import {signout} from "@/actions/sign-out";
import {usePathname} from "next/navigation";

type Props = {
  userSession: string;
  locale: string;
};

export const UserProfile = ({userSession, locale}: Props) => {
  const t = useTranslations();

  const formatText = (text: string) => {
    if (text.length > 28) {
      return text.slice(0, 28) + "...";
    }
    return text;
  };

  const extractInitials = (name: string) => {
    const words = name.split(" ");
    let initials = "";

    words.forEach((word) => {
      initials += word.charAt(0);
    });

    return initials.slice(0, 2);
  };

  const data = {
    admin: {image: "/admin.jpg", name: "Orobet Alin", emailId: "alin.orobet@student.usv.ro"},
    student: {
      image: "/student.png",
      name: "Orobet Alin-Ciprian",
      emailId: "ciprian.orobet@student.usv.ro",
    },
    secretary: {image: "/secretary.png", name: "Orobet Alin", emailId: "orobet.alin@gmail.com"},
  };

  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const isStudent = pathname.includes("student");

  const typeOfUser = isAdmin ? "admin" : isStudent ? "student" : "secretary";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        {userSession ? (
          <Avatar>
            <AvatarImage src={data[typeOfUser].image} alt="@shadcn" />
            <AvatarFallback>{extractInitials(data[typeOfUser].name)}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="h-6 w-6" color="white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[300px] max-w-[300px] mr-4">
        {userSession && (
          <>
            <DropdownMenuItem className="p-2 flex flex-row items-center">
              <Avatar>
                <AvatarImage src={data[typeOfUser].image} alt="@shadcn" />
                <AvatarFallback>{extractInitials(data[typeOfUser].name)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <DropdownMenuLabel className="font-bold line-clamp-1 py-1 text-base">
                  {formatText(data[typeOfUser].name)}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="py-0 text-sm">
                  {formatText(data[typeOfUser].emailId)}
                </DropdownMenuLabel>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="py-0">
          <SelectLanguages />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-row items-center py-1 cursor-pointer"
          onClick={() => {}}
        >
          {userSession ? (
            <>
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
              <DropdownMenuLabel onClick={() => signout()}>{t("LOG_OUT")}</DropdownMenuLabel>
            </>
          ) : (
            <Link
              href="http://localhost:8080/login/google"
              className="flex flex-row items-center py-1"
            >
              <FcGoogle className="h-[1.2rem] w-[1.2rem]" />
              <DropdownMenuLabel>{t("GOOGLE_AUTH")}</DropdownMenuLabel>
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
