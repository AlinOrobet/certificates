"use client";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useTranslations} from "next-intl";
import React, {useState} from "react";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  handleCancel: () => void;
  handleConfirm: (motiv?: string) => void;
};

const InputDialog = ({isOpen, title, message, handleCancel, handleConfirm}: Props) => {
  const [motiv, setMotiv] = useState("");
  const t = useTranslations();
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <Input value={motiv} onChange={(e) => setMotiv(e.target.value)} />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            {t("CANCEL")}
          </Button>
          <Button
            disabled={!motiv}
            onClick={() => {
              handleConfirm(motiv);
              setMotiv("");
            }}
          >
            {t("CONFIRM")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
