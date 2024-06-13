import {useQuery} from "@tanstack/react-query";

type Props = {
  userSession: string;
};

export const useGetSecretaries = ({userSession}: Props) => {
  const query = useQuery({
    queryKey: ["secretaries"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/secretare`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: userSession,
        },
        credentials: "include",
      });

      return await response.json();
    },
  });

  return query;
};
