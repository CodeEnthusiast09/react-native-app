import { HabitCompletions } from "@/interfaces";
import { clientRequest } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useHabitsCompleted = () => {
  const { data, isPending, error, isError } = useQuery<HabitCompletions[]>({
    queryKey: ["completed-habits"],
    queryFn: () => {
      return clientRequest.habit.getCompleted();
    },
  });

  return {
    data,
    isPending,
    error,
    isError,
  };
};
