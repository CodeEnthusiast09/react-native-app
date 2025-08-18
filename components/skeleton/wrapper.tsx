import React, { Fragment } from "react";
import { DimensionValue, ViewStyle } from "react-native";
import { Skeleton } from ".";

type SkeletonWrapperProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  style?: ViewStyle;
  height?: DimensionValue;
  width?: DimensionValue;
  borderRadius?: number;
};

export const SkeletonWrapper = ({
  children,
  isLoading = false,
  style = {
    marginVertical: 16,
    borderRadius: 5,
    width: "100%",
  },
  height = 50,
  width = "100%",
  borderRadius = 5,
}: SkeletonWrapperProps) => {
  return (
    <Fragment>
      {isLoading ? (
        <Skeleton
          style={style}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      ) : (
        children
      )}
    </Fragment>
  );
};
