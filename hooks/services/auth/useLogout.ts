import { deleteFromStorage } from "@/lib/asyncStorage";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLogout = (onSuccess?: Function) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const mutate = () => {
    setIsPending(true);
    // clear login data
    deleteFromStorage("token");
    deleteFromStorage("user-id");
    deleteFromStorage("email");

    setTimeout(() => {
      if (onSuccess) {
        onSuccess?.();
      } else {
        // redirect to login page
        router.replace("/auth/sign-in");
      }
    }, 1100);
  };

  return { mutate, isPending };
};
