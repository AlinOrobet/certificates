import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;
interface RequestData {
  numeSecretarSef: string;
}

type RequestType = RequestData;

type Props = {
  userSession: string;
};

export const useChiefSecretaryNameMutation = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/update/numeSecretaraSef?numeSecretaraSef=${json.numeSecretarSef}`,
        {
          method: "PATCH",
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
      toast.success(t("SECRETARY_CHIEF_NAME_CREATE"));
      queryClient.invalidateQueries({queryKey: ["overview"]});
    },
    onError: () => {
      toast.error(t("SECRETARY_CHIEF_NAME_FAILD"));
    },
  });

  return mutation;
};
