import { Canvas, Path } from "@shopify/react-native-skia";
import React, { useMemo, type Ref } from "react";
import type { BarcodeViewRef, Format } from "../types";
import {
  encode,
  getCanvasProps,
  getSkiaPath
} from "../helpers/barcode-helpers";
import WrapperRect from "./WrapperRect";
import LinearGradient, { type LinearGradientProps } from "./LinearGradient";
import { useReference } from "../hooks/useReference";

export interface BarcodeViewProps extends Partial<LinearGradientProps> {
  /**
   * The value of the barcode.
   */
  value: string;
  /**
   * The width of each bar in the barcode. Default is 2.
   */
  barWidth?: number;
  /**
   * The height of the barcode. Default is 100.
   */
  height?: number;
  /**
   * The format of the barcode.
   */
  format: Format;
  /**
   * The color of the barcode lines. Default is "#000000".
   */
  color?: string;
  /**
   * The background color of the barcode. Default is "#ffffff".
   */
  bgColor?: string;
  /**
   * Callback function to handle errors during barcode encoding.
   * Should be wrapped in useCallback.
   */
  onError?: () => void;
  /**
   * The maximum width of the barcode. If specified, the barcode will be scaled down to fit within this width.
   */
  maxWidth?: number;
  /**
   * The padding around the barcode. Default is 0.
   */
  padding?: number;
  /**
   * The border radius of the wrapper rectangle around the barcode. Default is 0.
   */
  borderRadius?: number;
  /**
   * The blur radius for the background of the barcode. Default is 0.
   */
  bgBlur?: number;

  ref?: Ref<BarcodeViewRef>;
}

export function BarcodeView({
  value,
  format,
  barWidth = 2,
  height = 100,
  color = "#000000",
  bgColor = "#ffffff",
  onError,
  maxWidth,
  padding,
  borderRadius = 0,
  bgBlur = 0,
  gradientDirection,
  linearGradient,
  ref
}: BarcodeViewProps) {
  const canvasRef = useReference(ref);

  const { path, canvas } = useMemo(() => {
    const encoded = encode({
      value,
      format,
      width: barWidth,
      height,
      onError
    });

    if (!encoded) {
      return {
        path: null,
        canvas: {
          width: 0,
          height: 0,
          scale: 0
        }
      };
    }

    const path = getSkiaPath({
      binary: encoded.data,
      barWidth,
      height,
      padding
    });

    const canvasProps = getCanvasProps(
      encoded.data.length,
      height,
      barWidth,
      padding,
      maxWidth
    );

    return {
      path,
      canvas: canvasProps
    };
  }, [value, format, barWidth, height, onError, padding, maxWidth]);

  if (!path) return null;

  return (
    <Canvas
      ref={canvasRef}
      style={{
        width: canvas.width,
        height: canvas.height,
        backgroundColor: "transparent",
        transform: [{ scaleX: canvas.scale }]
      }}
    >
      <WrapperRect
        canvasWidth={canvas.width}
        canvasHeight={canvas.height}
        background={bgColor}
        bgBlur={bgBlur}
        borderRadius={borderRadius}
      />

      <Path path={path} color={color}>
        {linearGradient && (
          <LinearGradient
            linearGradient={linearGradient}
            gradientDirection={gradientDirection}
            sizeVertical={height}
            sizeHorizontal={canvas.width / canvas.scale}
          />
        )}
      </Path>
    </Canvas>
  );
}
