import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export interface InputBaseProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export default function InputBase({ placeholder, onChangeText }: InputBaseProps) {
  return <TextInput
        style={styles.inputStyle}
        placeholder={placeholder || "Search..."}
        placeholderTextColor={Colors.textDark}
        onChangeText={onChangeText}
      />
}

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    width: "100%",
    fontSize: 16,
    paddingVertical: 4,
    fontFamily: "Rubik-Regular",
    color: Colors.text,
  },

});

