import {useState} from "react";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useTranslations} from "next-intl";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const t = useTranslations();
  const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({resolve});
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const AccountDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            {t("CANCEL")}
          </Button>
          <Button onClick={handleConfirm}>{t("CONFIRM")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [AccountDialog, confirm];
};
