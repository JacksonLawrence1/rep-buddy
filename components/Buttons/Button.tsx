import { View } from "react-native";

import BaseButton, { ButtonProps, buttonStyles as styles } from "./BaseButton";

export default function Button({ ...buttonProps }: ButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <BaseButton {...buttonProps} />
    </View>
  );
}

