import { useLogout } from "@/hooks/services";
import toastConfig from "@/lib/toastConfig";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Index() {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  return (
    <View style={styles.view}>
      <Text style={styles.text}>This is the today&apos;s habit page</Text>

      <Button onPress={logout} loading={isLoggingOut} icon={"logout"}>
        Log out
      </Button>

      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  text: {
    color: "black",
  },

  link: {
    width: 120,
    padding: 8,
    marginTop: 10,
    backgroundColor: "blue",
    color: "white",
    fontSize: 16,
    borderRadius: 12,
    textAlign: "center",
  },
});
