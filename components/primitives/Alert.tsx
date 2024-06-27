import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/styles";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export interface AlertContextProps {
  enabled?: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  submitText?: string;
}

interface AlertProps extends AlertContextProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClose?: () => void;
  onSubmit?: () => void;
}

export default function Alert({
  visible,
  setVisible,
  title,
  description,
  cancelText = "Cancel",
  submitText,
  onClose,
  onSubmit,
}: AlertProps) {
  function handleOnClose() {
    setVisible(false);
    onClose && onClose();
  }

  function handleOnSubmit() {
    setVisible(false);
    onSubmit && onSubmit();
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.alertWrapper}>
          <View style={styles.alertContainer}>
            <Text style={globalStyles.title}>{title || "Confirm Changes"}</Text>
            <Text style={styles.description}>
              {description || "Are you sure you want to perform these changes?"}
            </Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                onPress={handleOnClose}
                style={[styles.button, styles.cancelBtn]}
              >
                <Text style={styles.buttonText}>{cancelText}</Text>
              </Pressable>
              {submitText && ( // only show submit button if submitText is provided
                <Pressable
                  onPress={handleOnSubmit}
                  style={[styles.button, styles.submitBtn]}
                >
                  <Text style={styles.buttonText}>{submitText}</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  alertWrapper: {
    height: "75%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  alertContainer: {
    position: "absolute",
    backgroundColor: colors.backgroundDark,
    borderRadius: 8,
    padding: 16,
    gap: 8,
    marginHorizontal: 32,
  },
  description: {
    color: colors.textDark,
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "Rubik-Regular",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  cancelBtn: {
    borderColor: colors.border,
    borderWidth: 1,
  },
  submitBtn: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
  },
});
