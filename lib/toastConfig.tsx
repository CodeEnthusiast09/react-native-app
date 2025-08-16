import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

const styles = StyleSheet.create({
  baseContainer: {
    width: "90%",
    alignSelf: "center",
    minHeight: 52,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    marginVertical: 5,
  },
  errorTitle: { color: "#D92D20", fontWeight: "bold" },
  errorText: { color: "#D92D20" },
  successTitle: { color: "#067647", fontWeight: "bold" },
  successText: { color: "#067647" },
});

const toastConfig = {
  error: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={[
        styles.baseContainer,
        { backgroundColor: "#FEF3F2", borderColor: "#D92D20" },
      ]}
    >
      {text1 && <Text style={styles.errorTitle}>{text1}</Text>}
      {text2 && <Text style={styles.errorText}>{text2}</Text>}
    </View>
  ),

  success: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={[
        styles.baseContainer,
        { backgroundColor: "#ECFDF3", borderColor: "#ABEFC6" },
      ]}
    >
      {text1 && <Text style={styles.successTitle}>{text1}</Text>}
      {text2 && <Text style={styles.successText}>{text2}</Text>}
    </View>
  ),

  delete: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={[
        styles.baseContainer,
        { backgroundColor: "#FEF3F2", borderColor: "#D92D20" },
      ]}
    >
      {text1 && <Text style={styles.errorTitle}>{text1}</Text>}
      {text2 && <Text style={styles.errorText}>{text2}</Text>}
    </View>
  ),
};

export default toastConfig;
