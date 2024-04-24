import React, { useMemo } from "react";
import {
  LinearGradient as SkiaLinearGradient,
  vec
} from "@shopify/react-native-skia";

export interface LinearGradientProps {
  linearGradient: [string, string];
  sizeVertical: number;
  sizeHorizontal: number;
  gradientDirection?: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
}

const defaultGradientDirection = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
};

function LinearGradient({
  linearGradient,
  gradientDirection = defaultGradientDirection,
  sizeHorizontal,
  sizeVertical
}: LinearGradientProps) {
  const {
    start: { x: startX, y: startY },
    end: { x: endX, y: endY }
  } = gradientDirection;

  const calculatedGradientDirection = useMemo(() => {
    return {
      start: vec(startX * sizeHorizontal, startY * sizeVertical),
      end: vec(endX * sizeHorizontal, endY * sizeVertical)
    };
  }, [startX, startY, endX, endY, sizeHorizontal, sizeVertical]);

  return (
    <SkiaLinearGradient
      start={calculatedGradientDirection.start}
      end={calculatedGradientDirection.end}
      colors={linearGradient}
    />
  );
}

export default LinearGradient;
