---
"rn-barcode-renderer": patch
---

Stop shipping `@shopify/react-native-skia` as a runtime dependency. It was listed in both `dependencies` and `peerDependencies`, which could install a second copy of Skia next to the app's own and cause a JS/native version mismatch. Skia is now a peer dependency only (`>=2.6.0`, unchanged), so the app's installed version is always used. Also bumps `jsbarcode` to `^3.12.3`.
