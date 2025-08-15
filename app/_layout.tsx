import { ProviderWrappers } from "@/components/provider-wrappers";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const segments = useSegments(); // tells us the current route

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!isAuthenticated && !inAuthGroup) {
      // not logged in → go to sign in
      router.replace("/auth/sign-in");
    } else if (isAuthenticated && inAuthGroup) {
      // already logged in → prevent going to auth screens
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <ProviderWrappers>
      <AuthProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
      </AuthProvider>
    </ProviderWrappers>
  );
}
