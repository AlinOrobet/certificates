"use client";

import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import PdfDialog from "./pdf-dialog";
import {useState} from "react";
import {useUserSession} from "@/features/secretary/store/user-session";

type Props = {
  id: string;
  dataCerere: string;
  numeStudent: string;
  scop: string;
  numarInregistare: string;
};

const PdfView = ({id, numeStudent, dataCerere, scop, numarInregistare}: Props) => {
  const t = useTranslations();
  const pathname = usePathname();
  const isAprovedPage = pathname.includes("aproved");

  const [isOpen, setIsOpen] = useState(false);
  const {id: userSession} = useUserSession();
  if (!isAprovedPage || !userSession) {
    return null;
  }
  return (
    <>
      <PdfDialog
        isOpen={isOpen}
        id={id}
        dataCerere={dataCerere}
        scop={scop}
        title={numeStudent}
        handleCancel={() => setIsOpen(false)}
        userSession={userSession}
        numarInregistare={numarInregistare}
      />
      <Button variant="link" onClick={() => setIsOpen(true)}>
        view
      </Button>
    </>
  );
};

export default PdfView;
