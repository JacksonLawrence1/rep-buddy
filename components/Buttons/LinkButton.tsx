import { ButtonProps } from "./BaseButton";
import { Link } from "expo-router";

import BaseButton from "./BaseButton";
import { buttonStyles as styles } from "./BaseButton";

interface LinkButtonProps extends ButtonProps {
  href: string;
  extra?: { [key: string]: string };
}

export default function Button({ href, extra, ...buttonProps }: LinkButtonProps) {
  return (
      <Link href={href} style={styles.buttonContainer} asChild>
          <BaseButton {...buttonProps} />
      </Link>
  );
}
