import { View } from "react-native";
import { ButtonProps } from "./BaseButton";

import { buttonStyles as styles } from "./BaseButton";
import ButtonBase from "./BaseButton";

export default function Button({ ...buttonProps }: ButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <ButtonBase {...buttonProps} />
    </View>
  );
}

