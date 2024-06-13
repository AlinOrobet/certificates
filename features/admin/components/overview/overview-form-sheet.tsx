import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useTranslations} from "next-intl";

type FormValues = {
  numeFacultate: string;
  precurtareFacultate: string;
  anUniversitar: string;
  numeDecan: string;
  numeSecretarSef: string;
};

type Props = {
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const OverviewFormSheet = ({onSubmit, disabled, defaultValues}: Props) => {
  const t = useTranslations();
  const formSchema = z.object({
    numeFacultate: z.string(),
    precurtareFacultate: z.string(),
    anUniversitar: z.string(),
    numeDecan: z.string(),
    numeSecretarSef: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          name="numeFacultate"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("UNIVERISTY_NAME")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="precurtareFacultate"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("UNIVERISTY_ABBREVIATION")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="anUniversitar"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("UNIVERISTY_YEAR")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="numeDecan"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("DEAN_NAME")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="numeSecretarSef"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("CHIEF_SECRETARY_NAME")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {t("SAVE_CHANGES")}
        </Button>
      </form>
    </Form>
  );
};
