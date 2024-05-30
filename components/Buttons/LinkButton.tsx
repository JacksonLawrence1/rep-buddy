import { ButtonProps } from "./BaseButton";
import { Link } from "expo-router";

import BaseButton from "./BaseButton";
import { styles } from "./Button";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export default function Button({ href, ...buttonProps }: LinkButtonProps) {
  return (
      <Link href={href} style={styles.buttonContainer} asChild>
          <BaseButton {...buttonProps} />
      </Link>
  );
}
