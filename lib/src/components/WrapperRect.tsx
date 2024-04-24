import { BlurMask, RoundedRect } from "@shopify/react-native-skia";
import React from "react";

interface WrapperRectProps {
  canvasWidth: number;
  canvasHeight: number;
  borderRadius: number;
  background: string;
  bgBlur: number;
}

function WrapperRect({
  canvasWidth,
  canvasHeight,
  background,
  bgBlur,
  borderRadius
}: WrapperRectProps) {
  return (
    <RoundedRect
      x={0}
      y={0}
      width={canvasWidth}
      height={canvasHeight}
      r={borderRadius}
      color={background}
    >
      <BlurMask blur={bgBlur} style="inner" />
    </RoundedRect>
  );
}

export default WrapperRect;
