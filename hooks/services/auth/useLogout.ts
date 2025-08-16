import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLogout = (onSuccess?: Function) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const router = useRouter();

  const { signOut } = useAuth();

  const mutate = async () => {
    setIsPending(true);
    await signOut();
    setIsPending(false);

    if (onSuccess) {
      onSuccess();
    } else {
      router.replace("/auth/sign-in");
    }
  };

  return { mutate, isPending };
};
