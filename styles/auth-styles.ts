import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    fontWeight: 700,
    marginBottom: 24,
  },

  text: {
    textAlign: "center",
  },

   button: {
    marginTop: 16,
    height: 52,
    borderRadius: 12,
    padding: 8,
  },

  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold", // optional
  },

  switchModeButton: {
    marginTop: 24,
  },
});
