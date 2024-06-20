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

export interface PopoutMenuOptions {
  options: React.ReactNode[];
}

type popoutMenuFn = () => void | Promise<void> | undefined;

interface BaseOptionProps {
  onPress?: popoutMenuFn;
}

interface OptionProps extends BaseOptionProps {
  label: string;
  icon: keyof typeof FontAwesome5.glyphMap;
}

export function GenericMenuOption({ label, icon, onPress }: OptionProps): React.ReactNode {
  return (
    <MenuOption onSelect={onPress}>
      <Text style={styles.text}>{label}</Text>
      <View style={{ paddingRight: 4 }}>
        <FontAwesome5 name={icon} size={16} color={colors.text} />
      </View>
    </MenuOption>
  );
}

// easier to import this than to define it inline
export function Edit({ onPress }: BaseOptionProps): React.ReactNode {
  return <GenericMenuOption label="Edit" onPress={onPress} icon="edit" />;
}

// easier to import this than to define it inline
export function History({ onPress }: BaseOptionProps): React.ReactNode {
  return <GenericMenuOption label="History" onPress={onPress} icon="history" />;
}

// because style is finnicky, defined this completely separately to generic option
export function Delete({ onPress }: BaseOptionProps): React.ReactNode {
  return (
    <MenuOption onSelect={onPress}>
      <Text style={styles.errorText}>Delete</Text>
      <View style={{ paddingRight: 4 }}>
        <FontAwesome5 name={"trash"} size={16} color={colors.error} />
      </View>
    </MenuOption>
  );
}

export function PopoutMenu({ options }: PopoutMenuOptions) {
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
