import React, { forwardRef, useMemo } from "react";
import { Canvas, Path } from "@shopify/react-native-skia";
import { getQrPath, matrix } from "../helpers/qr-helpers";
import type { BarcodeViewRef, ErrorCorrectionLevel } from "../types";
import WrapperRect from "./WrapperRect";
import LinearGradient, { type LinearGradientProps } from "./LinearGradient";
import { useReference } from "../hooks/useReference";

export interface QrCodeProps extends Partial<LinearGradientProps> {
  /**
   * The value of the QR code.
   */
  value: string;
  /**
   * The size of the QR code.
   * Default value: 100
   */
  size?: number;
  /**
   * The color of the QR code.
   * Default value: "black"
   */
  color?: string;
  /**
   * The background color of the QR code.
   * Default value: "white"
   */
  bgColor?: string;
  /**
   * The border radius of the QR code.
   * Default value: 0
   */
  borderRadius?: number;
  /**
   * The blur of the background of the QR code.
   * Default value: 0
   */
  bgBlur?: number;
  /**
   * The padding of the QR code.
   * Default value: 0
   */
  padding?: number;
  /**
   * The error correction level of the QR code.
   * Default value: "M"
   */
  ecl?: ErrorCorrectionLevel;
  /**
   * Callback function to handle errors.
   * Should be wrapped in useCallback.
   */
  onError?: () => void;
  /**
   * Function to render a logo on the QR code.
   * Receives the default props: { qrSize: number }.
   */
  renderLogo?: (defaultProps: { qrSize: number }) => React.ReactNode;
}

export const QrCode = forwardRef<BarcodeViewRef, QrCodeProps>(function QrCode(
  {
    value,
    size = 100,
    padding = 0,
    borderRadius = 0,
    bgBlur = 0,
    color = "black",
    bgColor = "white",
    linearGradient,
    gradientDirection,
    ecl = "M",
    onError,
    renderLogo
  },
  ref
) {
  const canvasRef = useReference(ref);

  const { path, canvas, qrSize } = useMemo(() => {
    try {
      const qrSize = size - padding * 2;
      const path = getQrPath(matrix(value, ecl), qrSize, padding);

      return { path, qrSize, canvas: { width: size, height: size } };
    } catch {
      onError?.();
      return {
        path: null,
        qrSize: 0,
        canvas: {
          width: 0,
          height: 0
        }
      };
    }
  }, [value, ecl, size, padding, onError]);

  if (!path) return null;

  return (
    <Canvas
      ref={canvasRef}
      style={{
        width: canvas.width,
        height: canvas.height,
        backgroundColor: "transparent"
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
            sizeHorizontal={qrSize}
            sizeVertical={qrSize}
          />
        )}
      </Path>

      {renderLogo && renderLogo({ qrSize: size })}
    </Canvas>
  );
});
