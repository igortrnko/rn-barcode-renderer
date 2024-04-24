import React, { useRef } from "react";
import { registerRootComponent } from "expo";
import { Button, StyleSheet, View } from "react-native";
import {
  BarcodeView,
  QrCode,
  QrLogo,
  type BarcodeViewRef
} from "rn-barcode-renderer";
import { ImageFormat } from "@shopify/react-native-skia";

export default function App() {
  const barcodeRef = useRef<BarcodeViewRef>(null);
  const qrRef = useRef<BarcodeViewRef>(null);

  return (
    <View style={styles.container}>
      <BarcodeView ref={barcodeRef} format="CODE128" value="123456" />

      <BarcodeView
        format="CODE128"
        value="123456"
        padding={10}
        borderRadius={10}
        color="blue"
        bgColor="lightgray"
        bgBlur={5}
      />

      <BarcodeView
        format="CODE128"
        value="123456"
        padding={10}
        bgColor={"lightgray"}
        color="black"
        borderRadius={10}
      />

      <BarcodeView
        format="CODE128"
        value="123456"
        padding={10}
        bgColor={"lightgrey"}
        borderRadius={10}
        linearGradient={["red", "blue"]}
        bgBlur={30}
      />

      <Button
        title="Get Barcode Snapshot"
        onPress={() => {
          console.log(barcodeRef.current?.getBytes(ImageFormat.PNG, 100));
        }}
      />

      <QrCode ref={qrRef} value="Hello World!" size={150} />

      <QrCode
        value="Hello World!"
        color="blue"
        bgColor="lightgray"
        padding={10}
        borderRadius={8}
        size={150}
      />

      <QrCode
        value="Hello World!"
        color="black"
        bgColor="lightgray"
        padding={10}
        borderRadius={8}
        size={150}
        linearGradient={["red", "blue"]}
        gradientDirection={{
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 }
        }}
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

      <Button
        title="Get Qr Snapshot"
        onPress={() => {
          console.log(qrRef.current?.getBase64(ImageFormat.JPEG, 100));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 20
  }
});

registerRootComponent(App);
