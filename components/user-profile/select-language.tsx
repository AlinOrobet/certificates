"use client";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import Flag from "react-world-flags";

import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Check, Languages} from "lucide-react";

export const SelectLanguages = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const languages = [
    {id: "ro", label: t("RO"), code: "ro"},
    {id: "en", label: t("EN"), code: "us"},
  ];

  const activeLanguage = languages.find((language) => pathname.includes(language.id));

  const handleLanguage = (language: string) => {
    const newPathname = pathname.replace(activeLanguage?.id ?? "ro", language);
    router.push(newPathname);
  };

  return (
    <form className="w-full">
      <Select>
        <SelectTrigger className="px-0">
          <div className="flex gap-x-2">
            <Languages className="h-[1.2rem] w-[1.2rem]" />
            <SelectValue
              placeholder={`${t("LANGUAGES")}: ${activeLanguage?.label}`}
              className="font-semibold"
            />
          </div>
        </SelectTrigger>
        <SelectContent className="flex flex-col">
          {languages.map((language) => (
            <Button
              key={language.id}
              variant="ghost"
              size="ghost"
              onClick={() => handleLanguage(language.id)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-x-2">
                <Flag code={language.code} className="h-4 w-4" />
                <p>{language.label}</p>
              </div>
              {activeLanguage?.id === language.id && (
                <Check className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
};
