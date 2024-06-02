import InputBase, { InputBaseProps } from "./InputBase";
import InputField from './InputField';

interface FormFieldProps extends InputBaseProps {
  title: string;
}

export function NumericInput({ title, ...inputProps }: FormFieldProps) {
  return (
    <InputField title={title}>
      <InputBase {...inputProps} inputMode="numeric" />
    </InputField>
  );
}

export function TextInput({ title, ...inputProps }: FormFieldProps) {
  return (
    <InputField title={title}>
      <InputBase {...inputProps} />
    </InputField>
  );
}
