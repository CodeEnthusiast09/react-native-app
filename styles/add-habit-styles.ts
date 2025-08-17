import { StyleSheet } from "react-native";

export const addHabitStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },

  button: {
    height: 60,
    borderRadius: 12,
    padding: 12,
  },

  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold", // optional
  },
});
