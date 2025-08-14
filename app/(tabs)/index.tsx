import toastConfig from "@/lib/toastConfig";
import { Button, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>

      <Text style={styles.text}>Hello word, I am learning react native</Text>

      <Text style={styles.text}>This is the like the home page</Text>

      <Button
        title="Show Success Toast"
        onPress={() =>
          Toast.show({
            type: "success",
            text1: "Success!",
            text2: "Your item has been saved successfully.",
          })
        }
      />
      <Button
        title="Show Error Toast"
        onPress={() =>
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: "An error occurred while saving your item.",
          })
        }
      />
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
