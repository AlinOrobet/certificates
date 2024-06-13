import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;
interface RequestData {
  precurtareFacultate: string;
  anUniversitar: string;
  numeDecan: string;
  numeSecretarSef: string;
}

type RequestType = RequestData;

type Props = {
  userSession: string;
};

export const useCreateOverview = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addInfoFacultate`, {
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
      toast.success(t("CREATE_OVERVIEW_CREATE"));
      queryClient.invalidateQueries({queryKey: ["overview"]});
    },
    onError: () => {
      toast.error(t("CREATE_OVERVIEW_FAILD"));
    },
  });

  return mutation;
};
