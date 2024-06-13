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
import {useCreateSecretary} from "../../api/use-create-secretary";
import {useTranslations} from "next-intl";
import {useNewSecretary} from "../../store/use-new-secretary";
import {SecretaryForm} from "./secretary-form";

type Props = {
  userSession: string;
};

type FormValues = {
  nume: string;
  prenume: string;
  titlu: string;
  email: string;
};

export const NewSecretarySheet = ({userSession}: Props) => {
  const t = useTranslations();
  const {isOpen, onClose} = useNewSecretary();

  const mutation = useCreateSecretary({userSession});

  const formSchema = z.object({
    nume: z.string(),
    prenume: z.string(),
    titlu: z.string(),
    email: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nume: "",
      prenume: "",
      titlu: "",
      email: "",
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
          <SheetTitle>{t("NEW_SECRETARY")}</SheetTitle>
          <SheetDescription>{t("CREATE_A_NEW_SECRETARY")}</SheetDescription>
        </SheetHeader>
        <SecretaryForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
