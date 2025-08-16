import { Habit } from "@/interfaces";
import { clientRequest } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useHabit = (id: string) => {
  const {
    data: response,
    isPending,
    error,
    isError,
  } = useQuery<Habit>({
    queryKey: ["habits", id],
    queryFn: () => {
      return clientRequest.habit.getOne(id);
    },
    enabled: !!id,
  });
  return { data: response, isPending, error, isError };
};
