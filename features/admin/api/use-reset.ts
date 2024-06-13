import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;

type RequestType = any;

type Props = {
  userSession: string;
};

export const useReset = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: userSession,
        },
        credentials: "include",
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success(t("RESET_CREATE"));
      queryClient.invalidateQueries({queryKey: ["overview"]});
      queryClient.invalidateQueries({queryKey: ["students"]});
      queryClient.invalidateQueries({queryKey: ["secretaries"]});
    },
    onError: () => {
      toast.success(t("RESET_CREATE"));
      queryClient.invalidateQueries({queryKey: ["overview"]});
      queryClient.invalidateQueries({queryKey: ["students"]});
      queryClient.invalidateQueries({queryKey: ["secretaries"]});
    },
  });

  return mutation;
};
