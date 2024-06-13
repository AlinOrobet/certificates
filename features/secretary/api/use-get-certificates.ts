import {useQuery} from "@tanstack/react-query";

type Props = {
  userSession: string;
};

export const useGetCertificates = ({userSession}: Props) => {
  const query = useQuery({
    queryKey: ["certificates-noi"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/secretara/adeverinte/noi/list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: userSession,
          },
          credentials: "include",
        }
      );

      return await response.json();
    },
  });

  return query;
};
