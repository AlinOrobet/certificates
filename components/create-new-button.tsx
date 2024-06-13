"use client";
import {useTranslations} from "next-intl";
import {Plus, Printer} from "lucide-react";
import {Button} from "./ui/button";
import {useNewSecretary} from "@/features/admin/store/use-new-secretary";

type Props = {
  type: "secretary" | "raports" | "raports-aproved";
  userSession: string;
};

export const CreateNewButton = ({type, userSession}: Props) => {
  const t = useTranslations();

  const newSecretary = useNewSecretary();

  const handleOnClick = async () => {
    switch (type) {
      case "secretary":
        return newSecretary.onOpen();
      case "raports":
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/secretara/raport`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: userSession,
            },
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch report");
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "raport.xlsx";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error fetching report:", error);
        }
        break;
      case "raports-aproved":
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/secretara/raport`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: userSession,
            },
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch report");
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "raport.xlsx";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error fetching report:", error);
        }
        break;
    }
  };

  return (
    <Button onClick={handleOnClick} size="sm" className="w-full lg:w-auto">
      {type === "secretary" ? (
        <>
          <Plus className="size-4 mr-2" />
          {t("ADD_NEW")}
        </>
      ) : (
        <>
          <Printer className="size-4 mr-2" />
          {t("GENERATE_RAPORT")}
        </>
      )}
    </Button>
  );
};
