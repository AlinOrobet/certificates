"use client";
import {useEffect, useState} from "react";

import {NewSecretarySheet} from "@/features/admin/components/secretary/new-secretary-sheet";
import {NewOverviewSheet} from "@/features/admin/components/overview/new-overview-sheet";
import {EditCertificateSheet} from "@/features/secretary/components/edit-certificate-sheet";

type Props = {
  userSession?: string;
};

export const SheetProvider = ({userSession}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !userSession) {
    return null;
  }

  return (
    <>
      <NewOverviewSheet userSession={userSession} />
      <NewSecretarySheet userSession={userSession} />
      <EditCertificateSheet userSession={userSession} />
    </>
  );
};
