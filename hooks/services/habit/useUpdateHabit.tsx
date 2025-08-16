import { APIResponse, ApiError } from "@/interfaces";
import { clientRequest } from "@/services";
import { habitValidationSchema } from "@/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { InferType } from "yup";

type MutationProp = {
  data: InferType<typeof habitValidationSchema>;
};

export const useUpdateHabit = (onSuccess?: Function) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: async ({ data }: MutationProp) => {
      return clientRequest.habit.update(data);
    },
    onSuccess: (response: APIResponse) => {
      if (response?.success) {
        Toast.show({
          type: "success",
          text1: response.message || "Habit updated successfully",
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
        text1: error?.message || "Opps! Something went wrong.",
      });
    },
  });
  return { mutate, isPending, isSuccess };
};
