import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;

type RequestType = any;

type Props = {
  userSession?: string;
};

export const useSetId = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!userSession) {
        throw new Error("Missing sesssion");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/secretara/numarInregistrare?numarInregistrare=${json.motiv}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: userSession,
          },
          credentials: "include",
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      toast.success(t("NR_INREGISTRARE_SUCCES"));
    },
    onError: () => {
      toast.success(t("NR_INREGISTRARE_FAILD"));
    },
  });

  return mutation;
};
