import { Link } from "expo-router";
import { ButtonProps } from "@/components/buttons/BaseButton";

import BaseButton, { buttonStyles as styles } from "@/components/buttons/BaseButton";

interface LinkButtonProps extends ButtonProps {
  href: string;
  replace?: boolean;
  extra?: { [key: string]: string };
}

export default function Button({ href, replace = false, extra, ...buttonProps }: LinkButtonProps) {
  return (
      <Link replace={replace} href={href} style={styles.buttonContainer} asChild>
          <BaseButton {...buttonProps} />
      </Link>
  );
}
