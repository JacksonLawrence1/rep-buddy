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
import { router } from "expo-router";

interface DeleteOptionProps<T extends baseStorageItem> {
  id: string;
  service: BaseStorageClass<T>;
}

interface EditOptionProps {
  id: string;
  path: string; // navigate to this dynamic route with the id
}

export interface PopoutMenuOptions {
  icon: keyof typeof FontAwesome5.glyphMap;
  options: React.ReactNode[];
}

export function DeleteOption<T extends baseStorageItem>({
  id,
  service,
}: DeleteOptionProps<T>): React.ReactNode {
  return (
    <MenuOption onSelect={() => service.deleteData(id)}>
      <Text style={styles.errorText}>Delete</Text>
      <View style={{ paddingRight: 4 }}>
        <FontAwesome5 name="trash" size={16} color={colors.error} />
      </View>
    </MenuOption>
  );
}

export function EditOption({
  id,
  path // MUST be a dynamic route (e.g. "exercises/[id]", "workouts/[id]")
}: EditOptionProps): React.ReactNode {
  return (
    <MenuOption onSelect={() => router.navigate({pathname: path, params: { id: id }})}>
      <Text style={styles.text}>Edit</Text>
      <View style={{ paddingRight: 4 }}>
        <FontAwesome5 name="edit" size={16} color={colors.text} />
      </View>
    </MenuOption>
  );
}

export function PopoutMenu({ icon, options }: PopoutMenuOptions) {
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
          <FontAwesome5 name={icon} size={20} color={colors.text} />
        </MenuTrigger>
        <MenuOptions customStyles={menuStyles}>
          {options.map(option => option)}
        </MenuOptions>
      </Menu>
    </View>
  );
}

const menuStyles = StyleSheet.create({
  optionsContainer: {
    alignItems: "center",
    backgroundColor: colors.backgroundDark,
    width: 200,
    padding: 8,
    borderRadius: 8,
    shadowOpacity: 0,
    marginTop: -4,
  },
  optionsWrapper: {
    gap: 8,
    width: "100%",
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
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
});
