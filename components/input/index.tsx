import { addCommaToNumber } from "@/lib/utils";
import React, { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { InputProps } from "./types";

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      error,
      label,
      style,
      labelStyle,
      readOnly = false,
      placeholder,
      defaultValue,
      value,
      onChangeText,
      leftIcon,
      showRequiredAsterik = false,
      addCommaToValue = false,
      ...rest
    },
    ref
  ) => {
    const handleChangeText = (inputValue: string) => {
      let processedValue = inputValue;

      if (addCommaToValue) {
        const numericValue = inputValue.replace(/[^0-9.]/g, "");

        // Handle special cases: empty string, just a dot, or dot followed by digits
        if (
          numericValue === "" ||
          numericValue === "." ||
          numericValue.match(/^\.\d*$/)
        ) {
          processedValue = numericValue;
        } else {
          processedValue = addCommaToNumber(numericValue);
        }

        processedValue = addCommaToNumber(numericValue);
      }

      if (onChangeText) {
        onChangeText(processedValue);
      }
    };

    return (
      <View style={styles.container}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={[styles.label, labelStyle]}>
              {label}
              {showRequiredAsterik && <Text style={styles.asterisk}> *</Text>}
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            editable={!readOnly}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            defaultValue={defaultValue}
            onChangeText={
              onChangeText
                ? addCommaToValue
                  ? handleChangeText
                  : onChangeText
                : undefined
            }
            style={[
              styles.input,
              leftIcon ? styles.inputWithLeftIcon : null,
              error && styles.inputError,
              style,
            ]}
            {...rest}
          />
        </View>

        {error?.message && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: 4,
  },
  asterisk: {
    color: "#EF4444",
  },
  inputContainer: {
    position: "relative",
    marginTop: 4,
  },
  leftIconContainer: {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: "#4B5563",
    backgroundColor: "#FFFFFF",
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});
