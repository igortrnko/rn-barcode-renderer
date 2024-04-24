import { Skia, StrokeCap } from "@shopify/react-native-skia";
import QRCode from "qrcode";
import type { ErrorCorrectionLevel } from "../types";

export function matrix(
  value: string,
  errorCorrectionLevel: ErrorCorrectionLevel
) {
  const arr = Array.prototype.slice.call(
    QRCode.create(value, { errorCorrectionLevel }).modules.data,
    0
  ) as number[];

  const sqrt = Math.sqrt(arr.length);
  const result: number[][] = [];

  arr.forEach((val, i) => {
    if (i % sqrt === 0) {
      result.push([val]);
    } else {
      result[result.length - 1]?.push(val);
    }
  });

  return result;
}

export function getQrPath(matrix: number[][], size: number, padding = 0) {
  const cellSize = size / matrix.length;
  const path = Skia.Path.Make();

  matrix.forEach((row, i) => {
    let needDraw = false;
    row.forEach((column, j) => {
      if (column) {
        if (!needDraw) {
          path.moveTo(
            cellSize * j + padding,
            cellSize / 2 + cellSize * i + padding
          );
          needDraw = true;
        }
        if (needDraw && j === matrix.length - 1) {
          path.lineTo(
            cellSize * (j + 1) + padding,
            cellSize / 2 + cellSize * i + padding
          );
        }
      } else {
        if (needDraw) {
          path.lineTo(
            cellSize * j + padding,
            cellSize / 2 + cellSize * i + padding
          );
          needDraw = false;
        }
      }
    });
  });

  path.stroke({ width: cellSize, cap: StrokeCap.Butt });

  return path;
}
