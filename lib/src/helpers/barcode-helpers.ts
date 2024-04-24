import barcodes from "jsbarcode/src/barcodes";
import { Skia } from "@shopify/react-native-skia";
import type { Options } from "../types";

interface EncodeOptions
  extends Required<Pick<Options, "width" | "format" | "height">> {
  value: string;
  onError?: () => void;
}

interface GetSkiaPath {
  binary: string;
  barWidth: number;
  height: number;
  padding?: number;
}

export function encode(options: EncodeOptions) {
  const Encoder = barcodes[options.format];

  if (!Encoder) {
    if (__DEV__ && !options.onError) {
      throw new Error(`No encoder found for format ${options.format}`);
    }
    options.onError?.();
    return null;
  }

  const encoder = new Encoder(options.value, {
    width: options.width,
    format: options.format,
    height: options.height,
    flat: true
  });

  if (!encoder.valid()) {
    if (__DEV__ && !options.onError) {
      throw new Error(
        `Invalid value ${encoder.constructor.name} for selected format ${options.format}`
      );
    }
    options.onError?.();
    return null;
  }

  return encoder.encode();
}

export function getCanvasProps(
  dataLength: number,
  height: number,
  barWidth: number,
  padding = 0,
  maxWidth?: number
) {
  const canvasWidth = dataLength * barWidth + padding * 2;
  const canvasHeight = height + padding * 2;

  const scaleDown =
    maxWidth && canvasWidth > maxWidth ? maxWidth / canvasWidth : 1;

  return { width: canvasWidth, height: canvasHeight, scale: scaleDown };
}

export function getSkiaPath({
  binary,
  barWidth,
  height,
  padding = 0
}: GetSkiaPath) {
  const yFrom = padding;
  let x = 0;
  let barWidthMultiplier = 0;

  const path = Skia.Path.Make();

  for (let b = 0; b < binary.length; b++) {
    x = b * barWidth + padding;

    if (binary[b] === "1") {
      barWidthMultiplier++;
    } else if (barWidth > 0) {
      path.addRect({
        x: x - barWidth * barWidthMultiplier,
        y: yFrom,
        width: barWidth * barWidthMultiplier,
        height: height
      });
      barWidthMultiplier = 0;
    }
  }

  // Last draw is needed since the barcode ends with 1
  if (barWidthMultiplier > 0) {
    path.addRect({
      x: x - barWidth * (barWidthMultiplier - 1),
      y: yFrom,
      width: barWidth * barWidthMultiplier,
      height: height
    });
  }

  return path;
}
