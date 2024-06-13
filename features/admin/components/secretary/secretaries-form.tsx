"use client";

import {useTranslations} from "next-intl";
import {Loader2} from "lucide-react";

import {DataTable} from "@/components/data-table";
import {columns} from "@/app/[locale]/admin/secretaries/columns";

import {useGetSecretaries} from "../../api/use-get-secretaries";
import {useUserSession} from "@/features/secretary/store/user-session";
import {useEffect} from "react";

type Props = {
  userSession: string;
};

export const SecretariesForm = ({userSession}: Props) => {
  const t = useTranslations();

  const secretariesQuery = useGetSecretaries({userSession});
  const secretaries = secretariesQuery.data || [];
  const isDisabled = secretariesQuery.isLoading;

  const {id, onChange} = useUserSession();

  useEffect(() => {
    if (!id) {
      onChange(userSession);
    }
  }, [userSession]);

  if (isDisabled) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
      </div>
    );
  }

  return <DataTable filterKey="nume" filterLabel="name" columns={columns} data={secretaries} />;
};
