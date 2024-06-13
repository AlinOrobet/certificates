import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {useTranslations} from "next-intl";

import {useCreateOverview} from "../../api/use-create-overview";
import {OverviewFormSheet} from "./overview-form-sheet";
import {useNewOverview} from "../../store/use-new-overview";

type Props = {
  userSession: string;
};

type FormValues = {
  numeFacultate: string;
  precurtareFacultate: string;
  anUniversitar: string;
  numeDecan: string;
  numeSecretaraSef: string;
};

export const NewOverviewSheet = ({userSession}: Props) => {
  const t = useTranslations();
  const {isOpen, onClose} = useNewOverview();

  const mutation = useCreateOverview({userSession});

  const formSchema = z.object({
    numeFacultate: z.string(),
    precurtareFacultate: z.string(),
    anUniversitar: z.string(),
    numeDecan: z.string(),
    numeSecretaraSef: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numeFacultate: "",
      precurtareFacultate: "",
      anUniversitar: "",
      numeDecan: "",
      numeSecretaraSef: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>{t("NEW_OVERVIEW_INFO")}</SheetTitle>
          <SheetDescription>{t("NEW_OVERVIEW_INFO_COMPLETE_ALL")}</SheetDescription>
        </SheetHeader>
        <OverviewFormSheet onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
