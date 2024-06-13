"use client";
import {Trash, Upload} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {useCreateStudents} from "../../api/use-create-students";
import {useReset} from "../../api/use-reset";
import {useConfirm} from "@/hooks/use-confirm";

type Props = {
  userSession: string;
};

export const UploadButton = ({userSession}: Props) => {
  const t = useTranslations();
  const [ConfirmDialog, confirm] = useConfirm(t("ARE_YOU_SURE"), t("ARE_YOU_SURE_DELETE_ALL"));

  const [file, setFile] = useState<File | null>(null);

  const mutation = useCreateStudents({userSession});
  const resetMutation = useReset({userSession});

  const onSubmit = async () => {
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      mutation.mutate(
        {formData: data},
        {
          onSuccess: () => {
            setFile(null);
          },
        }
      );
    } catch (error) {}
  };

  const handleOnReset = async () => {
    const ok = await confirm();
    if (ok) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reset`, {
          method: "POST",
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
    }
  };

  return (
    <>
      <ConfirmDialog />

      <div className="flex flex-col lg:flex-row items-center gap-2">
        {file ? (
          <Button onClick={onSubmit} className="gap-x-2 w-full lg:w-auto" size="sm">
            <Upload className="h-4 w-4" />
            {file.name}
          </Button>
        ) : (
          <Button className="relative w-full lg:w-auto" size="sm">
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="opacity-0 z-10"
            />
            <div className="absolute inset-0 h-full w-full flex justify-center items-center gap-x-2">
              <Upload className="h-4 w-4" />
              {t("IMPORT")}
            </div>
          </Button>
        )}
        <Button variant="destructive" className="gap-x-2 w-full lg:w-auto" onClick={handleOnReset}>
          <Trash className="h-4 w-4" />
          {t("RESET")}
        </Button>
      </div>
    </>
  );
};
