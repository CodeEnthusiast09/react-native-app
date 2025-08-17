import React from "react";
import { useController } from "react-hook-form";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Option = {
  label: string;
  value: string;
};

interface RadioInputProps {
  label?: string;
  error?: { message?: string };
  name: string;
  options: Option[];
  control: any;
  labelStyle?: StyleProp<TextStyle>;
  defaultValue?: string;
  showRequiredAsterik?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  segmentStyle?: StyleProp<ViewStyle>;
  activeSegmentStyle?: StyleProp<ViewStyle>;
  segmentTextStyle?: StyleProp<TextStyle>;
  activeSegmentTextStyle?: StyleProp<TextStyle>;
}

export const RadioInput = ({
  label,
  error,
  name,
  options,
  control,
  labelStyle,
  defaultValue,
  showRequiredAsterik = false,
  wrapperStyle,
  segmentStyle,
  activeSegmentStyle,
  segmentTextStyle,
  activeSegmentTextStyle,
}: RadioInputProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister: true,
    rules: { required: true },
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {showRequiredAsterik && <Text style={styles.asterisk}> *</Text>}
        </Text>
      )}

      <View style={[styles.segmentedControl, wrapperStyle]}>
        {options?.map((option: Option, index: number) => {
          const isSelected = field.value === option.value;
          const isFirst = index === 0;
          const isLast = index === options.length - 1;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.segment,
                isFirst && styles.firstSegment,
                isLast && styles.lastSegment,
                isSelected && styles.activeSegment,
                segmentStyle,
                isSelected && activeSegmentStyle,
              ]}
              onPress={() => field.onChange(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.activeSegmentText,
                  segmentTextStyle,
                  isSelected && activeSegmentTextStyle,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error?.message && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 8,
  },
  asterisk: {
    color: "#EF4444",
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: "#6200ee",
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  firstSegment: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  lastSegment: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  activeSegment: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeSegmentText: {
    color: "#1F2937",
    fontWeight: "600",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    textTransform: "capitalize",
  },
});
