import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;
interface RequestData {
  nume: string;
  prenume: string;
  titlu: string;
  email: string;
}

type RequestType = RequestData;

type Props = {
  userSession: string;
};

export const useCreateSecretary = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addSecretara`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: userSession,
        },
        credentials: "include",
        body: JSON.stringify({...json}),
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success(t("CREATE_SECRETARY_CREATE"));
      queryClient.invalidateQueries({queryKey: ["secretaries"]});
    },
    onError: () => {
      toast.error(t("CREATE_SECRETARY_FAILD"));
    },
  });

  return mutation;
};
