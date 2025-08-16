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
     <Input label="Title" />
    </View>
  );
}
