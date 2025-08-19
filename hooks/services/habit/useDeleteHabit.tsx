// import { APIResponse, ApiError } from "@/interfaces";
// import { clientRequest } from "@/services";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Toast from "react-native-toast-message";

// type MutationProp = {
//   habitId: string;
// };

// export const useDeleteHabit = (onSuccess?: Function) => {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, isSuccess } = useMutation<
//     APIResponse,
//     ApiError,
//     MutationProp
//   >({
//     // @ts-ignore
//     mutationFn: ({ habitId }: MutationProp) => {
//       return clientRequest.habit.delete(habitId);
//     },
//     onSuccess: (response: APIResponse) => {
//       if (response?.success) {
//         Toast.show({
//           type: "success",
//           text1: response.message || "Habit deleted sucessfully",
//         });
//         queryClient.invalidateQueries({
//           queryKey: ["habits"],
//         });

//         onSuccess?.();
//       }
//     },
//     onError: (error: ApiError) => {
//       Toast.show({
//         type: "error",
//         text1: error.message || "Opps! Something went wrong.",
//       });
//     },
//   });

//   return { mutate, isPending, isSuccess };
// };

import { APIResponse, ApiError } from "@/interfaces";
import { clientRequest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type MutationProp = {
  habitId: string;
};

export const useDeleteHabit = (onSuccess?: Function) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation<
    APIResponse,
    ApiError,
    MutationProp,
    { previousHabits?: any[] }
  >({
    // @ts-ignore
    mutationFn: ({ habitId }: MutationProp) => {
      return clientRequest.habit.delete(habitId);
    },
    onMutate: async ({ habitId }) => {
      // Cancel outgoing refetches to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ["habits"] });

      // Snapshot previous data
      const previousHabits = queryClient.getQueryData<any[]>(["habits"]);

      // Optimistically update cache
      queryClient.setQueryData<any[]>(["habits"], (old = []) =>
        old.filter((habit) => habit.id !== habitId)
      );

      return { previousHabits };
    },
    onError: (error: ApiError, _vars, context) => {
      // Rollback cache if mutation fails
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits"], context.previousHabits);
      }

      Toast.show({
        type: "error",
        text1: error.message || "Opps! Something went wrong.",
      });
    },
    onSuccess: (response: APIResponse) => {
      if (response?.success) {
        Toast.show({
          type: "success",
          text1: response.message || "Habit deleted successfully",
        });
        onSuccess?.();
      }
    },
    onSettled: () => {
      // Ensure cache is synced with backend
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  return { mutate, isPending, isSuccess };
};
