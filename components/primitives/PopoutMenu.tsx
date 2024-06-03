import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

import { View, StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";

import { FontAwesome5 } from "@expo/vector-icons";
import {
  BaseStorageClass,
  baseStorageItem,
} from "@/constants/storage/BaseStorageClass";

export interface PopoutMenuOptions {
  options: React.ReactNode[];
}

interface DeleteOptionProps<T extends baseStorageItem> {
  id: string;
  service: BaseStorageClass<T>;
}

export function DeleteOption<T extends baseStorageItem>({
  id,
  service,
}: DeleteOptionProps<T>): React.ReactNode {
  return (
    <MenuOption onSelect={() => service.deleteData(id)}>
      <Text style={[styles.text, { color: colors.error }]}>Delete</Text>
      <View style={{ paddingRight: 4 }}>
        <FontAwesome5 name="trash" size={16} color={colors.error} />
      </View>
    </MenuOption>
  );
}

export default function PopoutMenu({ options }: PopoutMenuOptions) {
  return (
    <View>
      <Menu
        renderer={renderers.Popover}
        rendererProps={{
          placement: "top",
          anchorStyle: { backgroundColor: colors.backgroundDark },
        }}
      >
        <MenuTrigger>
          <FontAwesome5 name="ellipsis-h" size={20} color={colors.text} />
        </MenuTrigger>
        <MenuOptions customStyles={menuStyles}>
          {options.map((option) => option)}
        </MenuOptions>
      </Menu>
    </View>
  );
}

const menuStyles = StyleSheet.create({
  optionsContainer: {
    alignItems: "center",
    backgroundColor: colors.backgroundDark,
    maxWidth: 200,
    padding: 8,
    borderRadius: 8,
    shadowOpacity: 0,
    marginTop: -4,
  },
  optionsWrapper: {
    gap: 8,
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 8,
    padding: 4,
  },
});

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
  },
});
