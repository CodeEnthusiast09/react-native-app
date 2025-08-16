import { APIResponse, ApiError, User } from "@/interfaces";
import { storeInStorage } from "@/lib/asyncStorage";
import { useAuth } from "@/lib/auth-context";
import { clientRequest } from "@/services";
import { signInValidationSchema } from "@/validations";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { InferType } from "yup";

type MutationProp = { data: InferType<typeof signInValidationSchema> };

export const useSignIn = () => {
  const router = useRouter();

  const searchParams = useLocalSearchParams<{ returnUrl?: string }>();

  const returnUrl = searchParams?.returnUrl;

  const { setUser } = useAuth();

  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.auth?.login(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        const user: User = response?.data?.user;

        // if account has been verified
        // if (user && user.emailVerifiedAt) {
        Toast.show({
          type: "success",
          text1: response?.message ?? "Welcome back",
        });
        // NB:: token from response would have been saved to localStorage, see "src/services/client/client-request-gateway.ts"

        storeInStorage("user-id", user?.id);

        setUser(user?.id);

        if (returnUrl) {
          router.push(returnUrl as any);
          return;
        }

        // redirect to dashboard
        router.push("/(tabs)");

        // check if user has filled profile details
        // if (user?.dateOfBirth && user?.gender) {
        // redirect to dashboard
        // router.push("/dashboard");
        // } else {
        //   // redirect to profile settings page
        //   router.push("/profile/edit/bio-data?prompt=true");
        // }

        // } else {
        //   toast.error("Please verify your email address.");
        // }
      }
    },
    onError: (error: ApiError) => {
      Toast.show({
        type: "error",
        text1: error?.message ?? "Opps! Something went wrong.",
      });
    },
  });

  return { mutate, isPending };
};
