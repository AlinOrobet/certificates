"use client";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {Skeleton} from "../ui/skeleton";
import {Pencil} from "lucide-react";
import {useTranslations} from "next-intl";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "../ui/form";
import {Input} from "../ui/input";

type Props = {
  label: string;
  name: string;
  initialData?: string;
  placeholder?: string;
  onSubmit: (values: {[key: string]: string}) => void;
  isDisabled: boolean;
  noDataAction?: () => void;
};

export const InputField = ({
  label,
  name,
  initialData,
  placeholder = "",
  onSubmit,
  isDisabled,
  noDataAction,
}: Props) => {
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    if (!initialData) {
      noDataAction?.();
    } else {
      setIsEditing((current) => !current);
    }
  };

  const formSchema = z.object({
    [name]: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [name]: initialData as string,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    onSubmit(values as {[key: string]: string});
  };

  useEffect(() => {
    form.reset({[name]: initialData});
  }, [name, initialData, form]);

  return (
    <div className="p-4 mt-6 border rounded-md bg-muted-foreground/10">
      <div className="flex items-center justify-between font-medium">
        {label}
        <Button variant="ghost" disabled={isDisabled} onClick={toggleEdit}>
          {isEditing ? (
            t("CANCEL")
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              {t("EDIT")} {label}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {(initialData as string) || `${t("NO")} ${label.toLowerCase()}`}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name={name}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isDisabled} placeholder={placeholder} {...field} />
                  </FormControl>
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
      )}
    </div>
  );
};

InputField.Skeleton = function InputFieldSkeleton() {
  return (
    <div className="p-4 mt-6 border rounded-md bg-muted/10">
      <div className="flex items-center justify-between font-medium">
        <Skeleton className="h-10 w-32 bg-muted" />
        <Skeleton className="h-10 w-20 bg-muted" />
      </div>
      <Skeleton className="h-14 w-full mt-4" />
    </div>
  );
};
