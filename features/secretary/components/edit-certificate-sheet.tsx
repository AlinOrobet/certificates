"use client";
import {useTranslations} from "next-intl";
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
import {useOpenCertificate} from "../store/use-open-certificate";
import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useEditReason} from "../api/use-edit-reason";

type Props = {
  userSession: string;
};

type FormValues = {
  scop: string;
};

export const EditCertificateSheet = ({userSession}: Props) => {
  const t = useTranslations();
  const {isOpen, onClose, id, scop} = useOpenCertificate();

  const mutation = useEditReason({id, userSession});

  const formSchema = z.object({
    scop: z.string(),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {scop},
  });

  useEffect(() => {
    form.reset({scop});
  }, [scop, form]);

  const isDisabled = false;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
      onError: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>{t("EDIT_CERTIFICATE")}</SheetTitle>
          <SheetDescription>{t("EDIT_CERTIFICATE_DESCRIPTION")}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="scop"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isDisabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isDisabled}>
                {t("SAVE")}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
