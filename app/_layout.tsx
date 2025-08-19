import { ProviderWrappers } from "@/components/provider-wrappers";
import { AuthProvider } from "@/lib/auth-context";
import RouteGuard from "@/lib/route-guard";
import toastConfig from "@/lib/toastConfig";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
  },
  roundness: 12,
};

export default function RootLayout() {
  return (
    <ProviderWrappers>
      <GestureHandlerRootView>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <RouteGuard>
                <Stack>
                  <Stack.Screen name="auth" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </RouteGuard>
              <Toast config={toastConfig} />
            </SafeAreaProvider>
          </PaperProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </ProviderWrappers>
  );
}
