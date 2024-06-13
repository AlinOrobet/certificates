"use client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useTranslations} from "next-intl";
import qs from "query-string";
import Flag from "react-world-flags";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";

type Props = {
  locale: string;
};
export const LanguageSelect = ({locale}: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  const languages = [
    {id: "ro", label: t("RO"), code: "ro"},
    {id: "en", label: t("EN"), code: "us"},
  ];
  const activeLanguage = languages.find((language) => language.id === locale);

  const handleLanguage = (language: string) => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }
    const url = qs.stringifyUrl(
      {
        url: pathname.replace(activeLanguage?.id ?? "ro", language),
        query: currentQuery,
      },
      {skipEmptyString: true, skipNull: true}
    );
    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Flag code={activeLanguage?.code} className="h-6 w-6" alt={activeLanguage?.code} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] lg:min-w-[250px]">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
