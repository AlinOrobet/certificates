import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;

type RequestType = any;

type Props = {
  id?: string;
  userSession?: string;
};

export const useReject = ({id, userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!id || !userSession) {
        throw new Error("Invalid session");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/secretara/adeverinta/${id}/respinge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: userSession,
          },
          body: JSON.stringify({...json}),
          credentials: "include",
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["certificates-aproved"]});
      queryClient.invalidateQueries({queryKey: ["certificates-noi"]});
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: ["certificates-aproved"]});
      queryClient.invalidateQueries({queryKey: ["certificates-noi"]});
    },
  });

  return mutation;
};
