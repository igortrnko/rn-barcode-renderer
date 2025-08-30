---
"rn-barcode-renderer": major
---

## Breaking Changes

- **React Version Requirement**: Now requires React 19+ (previously supported React 18+)
- **React Native Version Requirement**: Now requires React Native 0.79+ (previously supported any version)
- **Skia Version Requirement**: Updated to require @shopify/react-native-skia 2.0.0+ (previously 0.1.190+)

## What Changed

- Updated peer dependencies to align with React 19 ecosystem
- Updated @shopify/react-native-skia requirement to 2.0.0+ for better compatibility
- Updated react-native-reanimated to 3.19.1+ (new requirement)
- Updated dev dependencies: @types/react to 19.1.12+, typescript to 5.9.2+
- Updated dependencies: jsbarcode to 3.12.1+

## Migration Guide

To use this version:

1. Upgrade React to version 19 or higher
2. Upgrade React Native to version 0.79 or higher
3. Upgrade @shopify/react-native-skia to version 2.0.0 or higher
4. Ensure react-native-reanimated is at least 3.19.1
5. Test your application for compatibility with the new versions

## Why This Change

This update ensures compatibility with the latest React Native ecosystem, takes advantage of new features and performance improvements in React 19, and aligns with the latest stable versions of core dependencies.
