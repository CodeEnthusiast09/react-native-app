import React, { ReactElement } from "react";
import { StyleProp, TextInputProps, TextStyle } from "react-native";

export interface InputProps extends Omit<TextInputProps, "onChangeText"> {
  label?: string | ReactElement;
  labelStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  error?: {
    message?: string;
  };
  readOnly?: boolean;
  value?: string;
  leftIcon?: React.ReactNode;
  showRequiredAsterik?: boolean;
  addCommaToValue?: boolean;
  style?: StyleProp<TextStyle>;
}
