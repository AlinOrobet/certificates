import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;
interface RequestData {
  reason: string;
}

type RequestType = RequestData;

type Props = {
  userSession: string;
};

export const useCreateCertificate = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adeverinta/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: userSession,
        },
        body: JSON.stringify({scop: json.reason}),
        credentials: "include",
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success(t("CERTIFICATE_CREATE"));
    },
    onError: () => {
      toast.success(t("CERTIFICATE_CREATE"));
    },
  });

  return mutation;
};
