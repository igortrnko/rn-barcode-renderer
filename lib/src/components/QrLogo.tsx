import {
  Group,
  Image,
  RoundedRect,
  rect,
  rrect,
  useImage,
  type DataSourceParam
} from "@shopify/react-native-skia";
import React from "react";

export interface QrLogoProps {
  /**
   * The source of the logo image.
   */
  src: DataSourceParam;
  /**
   * The size of the logo.
   * Default value: qrSize * 0.2
   */
  size?: number;
  /**
   * The background color of the logo.
   * Default value: "black"
   */
  bgColor?: string;
  /**
   * The padding around the logo.
   * Default value: 0
   */
  padding?: number;
  /**
   * The border radius of the logo.
   * Default value: 0
   */
  borderRadius?: number;
  /**
   * The size of the QR code.
   */
  qrSize: number;
}

export function QrLogo({
  src,
  size,
  bgColor = "black",
  borderRadius = 0,
  padding = 0,
  qrSize
}: QrLogoProps) {
  const image = useImage(src);

  const fullSize = size || qrSize * 0.2;
  const logoSize = fullSize - padding * 2;
  const position = (qrSize - fullSize) / 2;
  const imagePosition = position + padding;

  const logoRoundedRect = rrect(
    rect(imagePosition, imagePosition, logoSize, logoSize),
    borderRadius - (padding / fullSize) * borderRadius,
    borderRadius - (padding / fullSize) * borderRadius
  );

  return (
    <Group>
      <RoundedRect
        r={borderRadius}
        height={fullSize}
        width={fullSize}
        color={bgColor}
        x={position}
        y={position}
      />
      <Group clip={logoRoundedRect}>
        <Image
          image={image}
          height={logoSize}
          width={logoSize}
          x={imagePosition}
          y={imagePosition}
          fit={"cover"}
        />
      </Group>
    </Group>
  );
}
