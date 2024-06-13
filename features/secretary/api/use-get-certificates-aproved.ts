import {useQuery} from "@tanstack/react-query";

type Props = {
  userSession: string;
};

export const useGetCertificatesAproved = ({userSession}: Props) => {
  const query = useQuery({
    queryKey: ["certificates-aproved"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/secretara/adeverinte/aprobate/list`,
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
