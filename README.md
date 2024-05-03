# rn-barcode-renderer

A Barcode and Qr Code renderer for React Native based on @shopify/react-native-skia.

## Features

- Barcode render
- Qr code render
- Add gradient
- Optional logotype for qr code

## Installation

Start by installing the peer dependencie of `rn-barcode-renderer`:

```shell
yarn add @shopify/react-native-skia
```

Then install `rn-barcode-renderer`:

```shell
yarn add rn-barcode-renderer
```

## Usage

#### Barcode

```jsx
import { BarcodeView } from "rn-barcode-renderer";

// Simple usage

return <BarcodeView format="CODE128" value="123456" />;

// Add bacground, bars color, border raidus, background blur effect, padding...

return (
  <BarcodeView
    format="CODE128"
    value="123456"
    padding={10}
    borderRadius={10}
    color="blue"
    bgColor="lightgray"
    bgBlur={5}
  />
);
```

#### Barcode Props

| Prop Name    | Type              | Description                                                                                               |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------- |
| value        | string (required) | The value of the barcode.                                                                                 |
| format       | Format (required) | The format of the barcode.                                                                                |
| barWidth     | number            | The width of each bar in the barcode. Default is 2.                                                       |
| height       | number            | The height of the barcode. Default is 100.                                                                |
| color        | string            | The color of the barcode lines. Default is "#000000".                                                     |
| bgColor      | string            | The background color of the barcode. Default is "#ffffff".                                                |
| onError      | () => void        | Callback function to handle errors during barcode encoding. Should be wrapped in useCallback.             |
| maxWidth     | number            | The maximum width of the barcode. If specified, the barcode will be scaled down to fit within this width. |
| padding      | number            | The padding around the barcode. Default is 0.                                                             |
| borderRadius | number            | The border radius of the wrapper rectangle around the barcode. Default is 0.                              |
| bgBlur       | number            | The blur radius for the background of the barcode. Default is 0.                                          |

#### Qr Code

```jsx
import { QrCode } from "rn-barcode-renderer";

// Simple usage

return <QrCode value="Hello World!" />;

// Add bacground, color, border raidus, background blur effect, padding, change size...

return (
  <QrCode
    value="Hello World!"
    color="blue"
    bgColor="lightgray"
    padding={10}
    borderRadius={8}
    size={150}
  />
);
```

Render QR Code with logo

```jsx
import { QrCode, QrLogo } from "rn-barcode-renderer";

return (
  <QrCode
    value="Hello World!"
    renderLogo={(defaultProps) => (
      <QrLogo
        src={require("./assets/favicon.png")}
        padding={2}
        borderRadius={9999}
        bgColor="white"
        {...defaultProps}
      />
    )}
  />
);
```

#### Qr Code props

| Prop name    | Type                                                  | Description                                                                               |
| ------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| value        | string (required)                                     | The value of the QR code.                                                                 |
| size         | number                                                | The size of the QR code. Default value: 100.                                              |
| color        | string                                                | The color of the QR code. Default value: "black".                                         |
| bgColor      | string                                                | The background color of the QR code. Default value: "white".                              |
| borderRadius | number                                                | The border radius of the QR code. Default value: 0.                                       |
| bgBlur       | number                                                | The blur of the background of the QR code. Default value: 0.                              |
| padding      | number                                                | The padding of the QR code. Default value: 0.                                             |
| ecl          | ErrorCorrectionLevel                                  | The error correction level of the QR code. Default value: "M".                            |
| onError      | () => void                                            | Callback function to handle errors. Should be wrapped in useCallback.                     |
| renderLogo   | (defaultProps: { qrSize: number }) => React.ReactNode | Function to render a logo on the QR code. Receives the default props: { qrSize: number }. |

### Methods (BarcodeView and QrCode)

| Method                                              | Description                                           |
| --------------------------------------------------- | ----------------------------------------------------- |
| `getBytes(format?: ImageFormat, quality?: number)`  | Returns the barcode image as a `Uint8Array`.          |
| `getBase64(format?: ImageFormat, quality?: number)` | Returns the barcode image as a base64-encoded string. |
| `getImageInfo()`                                    | Returns information about the barcode image.          |

## Contributing

1. Fork and clone the repository
2. Install the project dependencies by running yarn install.
3. To develop the library in unison with the example app you can run yarn dev
4. Implement your changes, as well as any documentation.
5. Create a changeset for your changes by running yarn changeset.
6. Open a pull request with your changes and changeset.

## License

MIT
