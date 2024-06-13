import {useQuery} from "@tanstack/react-query";

type Props = {
  userSession?: string;
};

export const useGetId = ({userSession}: Props) => {
  const query = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      if (!userSession) {
        throw new Error("Missing sesssion");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/secretara/numarInregistrare`,
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
