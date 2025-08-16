import { Input } from "@/components/input";
import { View } from "react-native";

export default function AddhabitScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input label="Title" labelStyle={{ fontSize: 16 }} />

      <Input label="Description" labelStyle={{ fontSize: 16 }} />
    </View>
  );
}
