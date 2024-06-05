import Tag from "./Tag";

interface TagEnumProps<T extends string> {
  value: T;
  enabledOnStart?: boolean;
  onPress: (item: T) => void;
}

export default function TagEnum<T extends string>({
  value,
  enabledOnStart = false,
  onPress,
}: TagEnumProps<T>) {
  return (
    <Tag
      label={value}
      enabledOnStart={enabledOnStart}
      callback={() => onPress(value)}
    />
  );
}
