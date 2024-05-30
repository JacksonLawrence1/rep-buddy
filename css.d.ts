import 'react-native';

// Extend the ViewStyle interface with boxShadow
declare module 'react-native' {
  interface ViewStyle {
    boxShadow?: string;
  }
}
