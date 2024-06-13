import {z} from "zod";
import {Trash} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useTranslations} from "next-intl";

type FormValues = {
  nume: string;
  prenume: string;
  titlu: string;
  email: string;
};

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const SecretaryForm = ({id, onSubmit, disabled, onDelete, defaultValues}: Props) => {
  const t = useTranslations();
  const formSchema = z.object({
    nume: z.string(),
    prenume: z.string(),
    titlu: z.string(),
    email: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          name="nume"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("LAST_NAME")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="prenume"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("FIRST_NAME")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="titlu"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("TITLE")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("EMAIL")}</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? t("SAVE_CHANGES") : t("CREATE_SECRETARY")}
        </Button>
        {id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            size="icon"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            {t("DELETE_SECRETARY")}
          </Button>
        )}
      </form>
    </Form>
  );
};
