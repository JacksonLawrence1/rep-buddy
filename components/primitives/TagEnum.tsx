import Tag from "./Tag";

interface TagEnumProps<T extends string> {
  value: T;
  enabledOnStart?: boolean;
  setToAddTo?: Set<T>;
}

export default function TagEnum<T extends string>({
  value,
  enabledOnStart = false,
  setToAddTo,
}: TagEnumProps<T>) {

  const onPress = (state: boolean) => {
    // optionally add/remove tag to a set
    if (setToAddTo && value) {
      if (state) {
        setToAddTo.add(value);
      } else {
        setToAddTo.delete(value);
      }
    }
  };

  return <Tag label={value} enabledOnStart={enabledOnStart} callback={onPress} />;
}
