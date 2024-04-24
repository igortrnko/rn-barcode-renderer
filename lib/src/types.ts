import type { ImageFormat, ImageInfo } from "@shopify/react-native-skia";

export type Format =
  | "CODE39"
  | "CODE128"
  | "CODE128A"
  | "CODE128B"
  | "CODE128C"
  | "EAN13"
  | "EAN8"
  | "EAN5"
  | "EAN2"
  | "UPC"
  | "UPCE"
  | "ITF14"
  | "ITF"
  | "MSI"
  | "MSI10"
  | "MSI11"
  | "MSI1010"
  | "MSI1110"
  | "pharmacode"
  | "codabar";

export interface Options {
  width?: number;
  height?: number;
  format: Format;
  displayValue?: boolean;
  fontOptions?: string;
  font?: string;
  text?: string | undefined;
  textAlign?: "left" | "center" | "right";
  textPosition?: "top" | "bottom";
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number | undefined;
  marginBottom?: number | undefined;
  marginLeft?: number | undefined;
  marginRight?: number | undefined;
  flat?: boolean;
}

/**
 * level - error resistance
 * L - 7%
 * M - 15%
 * Q - 25%
 * H - 30%
 * */
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface BarcodeViewRef {
  getBytes: (format?: ImageFormat, quality?: number) => Uint8Array | null;
  getBase64: (format?: ImageFormat, quality?: number) => string | null;
  getImageInfo: () => ImageInfo | null;
}
