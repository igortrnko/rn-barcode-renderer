interface Encode {
  text: string;
  data: string;
}

class Barcode {
  constructor(data: string, options: import("./types").Options);
  valid(): boolean;
  encode(): Encode;
}

declare module "jsbarcode/src/barcodes" {
  const barcodes: Record<import("./types").Format, typeof Barcode>;
  export default barcodes;
}
