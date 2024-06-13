"use client";
import {z} from "zod";
import {useTranslations} from "next-intl";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BeatLoader} from "react-spinners";

import useReasons from "@/hooks/use-reasons";
import {Select} from "@/components/select";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";

import {useCreateCertificate} from "../api/use-create-certificate";

type FormValues = {
  reason: string;
};

const formSchema = z.object({
  reason: z.string(),
});

type Props = {
  userSession: string;
};

export const StudentForm = ({userSession}: Props) => {
  const {reasons, addReason} = useReasons();

  const mutation = useCreateCertificate({userSession});
  const isPending = mutation.isPending;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });
  const t = useTranslations();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const handleOnCreate = (value: string) => {
    addReason(value);
  };

  if (isPending) {
    return (
      <div className="flex justify-center">
        <BeatLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="reason"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("REASON")}</FormLabel>
              <FormControl>
                <Select
                  placeholder={t("SELECT_REASON_PLACEHOLDER")}
                  options={reasons}
                  onCreate={handleOnCreate}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isPending || form.getValues().reason === ""}>
          {t("CONFIRM")}
        </Button>
      </form>
    </Form>
  );
};
