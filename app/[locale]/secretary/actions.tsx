"use client";

import {BadgeCheck, Edit, MoreHorizontal, Trash} from "lucide-react";

import {useConfirm} from "@/hooks/use-confirm";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {useOpenCertificate} from "@/features/secretary/store/use-open-certificate";
import {useReject} from "@/features/secretary/api/use-reject";
import {useUserSession} from "@/features/secretary/store/user-session";
import {useAprove} from "@/features/secretary/api/use-aprove";
import InputDialog from "./input-dialog";
import {useState} from "react";
import {useSetId} from "@/features/secretary/api/use-set-id";
import {useGetId} from "@/features/secretary/api/use-get-id";

type Props = {
  id: string;
  scop: string;
};

export const Actions = ({id, scop}: Props) => {
  const t = useTranslations();
  const pathname = usePathname();
  const isAprovedPage = pathname.includes("aproved");

  const [ConfirmDialog, confirm] = useConfirm(t("ARE_YOU_SURE"), t("ARE_YOU_SURE_DELETE_ALL"));

  const {id: userID} = useUserSession();
  const {onOpen} = useOpenCertificate();
  const rejectMutation = useReject({id, userSession: userID});
  const aproveMutation = useAprove({id, userSession: userID});
  const setNrID = useSetId({userSession: userID});
  const getId = useGetId({userSession: userID});

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleReject = async () => {
    const ok = await confirm();
    if (ok) {
      setIsOpen(true);
    }
  };

  const handleAprove = async () => {
    aproveMutation.mutate(undefined, {
      onError: () => {
        if (!getId.data) {
          setIsVisible(true);
        }
      },
    });
  };

  const isDisabled = rejectMutation.isPending || aproveMutation.isPending;

  if (isAprovedPage) {
    return null;
  }

  return (
    <>
      <InputDialog
        isOpen={isOpen}
        handleCancel={() => setIsOpen(false)}
        title="ADD_REASON"
        message="WHY_REJECT_THIS_CERTIFICATE"
        handleConfirm={(motiv?: string) => {
          rejectMutation.mutate({motiv});
          setIsOpen(false);
        }}
      />
      <InputDialog
        isOpen={isVisible}
        handleCancel={() => setIsVisible(false)}
        title={t("ADD_NR_INREGISTRARE")}
        message=""
        handleConfirm={(motiv?: string) => {
          setNrID.mutate({motiv});
          setIsVisible(false);
          handleAprove();
        }}
      />
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isDisabled} onClick={handleAprove}>
            <BadgeCheck className="size-4 mr-2" />
            {t("APROVE")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpen(id, scop);
            }}
            disabled={isDisabled}
          >
            <Edit className="size-4 mr-2" />
            {t("EDIT")}
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isDisabled} onClick={handleReject}>
            <Trash className="size-4 mr-2" />
            {t("REJECT")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
