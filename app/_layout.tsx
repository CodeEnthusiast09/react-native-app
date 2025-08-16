import { ProviderWrappers } from "@/components/provider-wrappers";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import toastConfig from "@/lib/toastConfig";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const segments = useSegments(); // tells us the current route

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!isAuthenticated && !inAuthGroup && !isLoading) {
      router.replace("/auth/sign-in");
    } else if (isAuthenticated && inAuthGroup && !isLoading) {
      router.replace("/(tabs)");
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
        <PaperProvider>
          <SafeAreaProvider>
            <RouteGuard>
              <Stack>
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </RouteGuard>
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </ProviderWrappers>
  );
}
