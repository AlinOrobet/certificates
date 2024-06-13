import {useQuery} from "@tanstack/react-query";

type Props = {
  userSession: string;
};

export const useGetStudents = ({userSession}: Props) => {
  const query = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/studenti`, {
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
