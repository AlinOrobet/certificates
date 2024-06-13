"use client";

import {Loader2} from "lucide-react";

import {DataTable} from "@/components/data-table";

import {useGetCertificates} from "../api/use-get-certificates";
import {columns} from "@/app/[locale]/secretary/columns";
import {useGetCertificatesAproved} from "../api/use-get-certificates-aproved";
import {useUserSession} from "../store/user-session";
import {useEffect} from "react";

type Props = {
  userSession: string;
  variant?: string;
};

enum Variants {
  APROBATE = "aprobate",
  RESPINSE = "respinse",
  NOI = "noi",
}

export const CertificatesForm = ({userSession, variant = Variants.NOI}: Props) => {
  const certificatesQuery = useGetCertificates({userSession});
  const certificatesNoi = certificatesQuery.data || [];

  const certificatesAprovedQuery = useGetCertificatesAproved({userSession});
  const certificatesAproved = certificatesAprovedQuery.data || [];

  const isDisabled = certificatesNoi.isLoading || certificatesAproved.isLoading;

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

  switch (variant) {
    case "aprobate":
      return (
        <DataTable
          filterKey="numeStudent"
          filterLabel="person"
          columns={columns}
          data={certificatesAproved}
        />
      );

    default:
      return (
        <DataTable
          filterKey="numeStudent"
          filterLabel="person"
          columns={columns}
          data={certificatesNoi}
        />
      );
  }
};
