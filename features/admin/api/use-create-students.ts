import {useTranslations} from "next-intl";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = Record<string, any>;
interface RequestData {
  formData: FormData;
}

type RequestType = RequestData;

type Props = {
  userSession: string;
};

export const useCreateStudents = ({userSession}: Props) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (requestData) => {
      const {formData} = requestData;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addStudentiExcel`, {
        method: "POST",
        headers: {
          Cookie: userSession,
        },
        credentials: "include",
        body: formData,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success(t("STUDENTS_CREATE"));
      queryClient.invalidateQueries({queryKey: ["students"]});
    },
    onError: () => {
      toast.error(t("STUDENTS_FAILD"));
    },
  });

  return mutation;
};
