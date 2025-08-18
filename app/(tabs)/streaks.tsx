import { useLogout } from "@/hooks/services";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function StreaksScreen() {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the streaks page</Text>

      <Button onPress={logout} loading={isLoggingOut} icon={"logout"}>
        Sign out
      </Button>
    </View>
  );
}
