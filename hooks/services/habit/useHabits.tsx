import { Habit } from "@/interfaces";
import { clientRequest } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useHabits = () => {
  const { data, isPending, error, isError } = useQuery<Habit[]>({
    queryKey: ["habits"],
    queryFn: () => {
      return clientRequest.habit.getAll();
    },
  });

  return {
    data,
    isPending,
    error,
    isError,
  };
};
