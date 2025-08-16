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
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ fenderPartId }: MutationProp) => {
      return clientRequest.habit.delete(fenderPartId);
    },
    onSuccess: (response: APIResponse) => {
      if (response?.success) {
        Toast.show({
          type: "success",
          text1: response.message || "Habit deleted sucessfully",
        });
        queryClient.invalidateQueries({
          queryKey: ["habits"],
        });

        onSuccess?.();
      }
    },
    onError: (error: ApiError) => {
      Toast.show({
        type: "error",
        text1: error.message || "Opps! Something went wrong.",
      });
    },
  });

  return { mutate, isPending, isSuccess };
};
