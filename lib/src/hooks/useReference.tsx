import { ImageFormat, useCanvasRef } from "@shopify/react-native-skia";
import { useImperativeHandle, type Ref } from "react";
import type { BarcodeViewRef } from "../types";

export function useReference(ref?: Ref<BarcodeViewRef>) {
  const canvasRef = useCanvasRef();

  useImperativeHandle(ref, () => ({
    getBase64: (format: ImageFormat = ImageFormat.PNG, quality?: number) => {
      if (!canvasRef.current) return null;
      return canvasRef.current
        .makeImageSnapshot()
        .encodeToBase64(format, quality);
    },
    getBytes: (format: ImageFormat = ImageFormat.PNG, quality?: number) => {
      if (!canvasRef.current) return null;
      return canvasRef.current
        .makeImageSnapshot()
        .encodeToBytes(format, quality);
    },
    getImageInfo: () => {
      if (!canvasRef.current) return null;
      return canvasRef.current.makeImageSnapshot().getImageInfo();
    }
  }));

  return canvasRef;
}
