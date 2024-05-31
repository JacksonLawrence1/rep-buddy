import { StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import InputField from "@/components/inputs/InputField";
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/Buttons/Button";

interface ExerciseVariationProps {
  choice: string;
}

export default function ExerciseVariation({ choice }: ExerciseVariationProps) {
  if (choice === 'choice') {
    return (
    <>
      <InputField title="Choice of Exercises">
          {/* Added sets go here */}
          <Button theme="primary" label="Add Exercise" icon={"plus"} />
      </InputField>
    </>
    )
  }

  return (
    <>
      <InputField title="Exercise">
        <Button theme="primary" label="Choose Exercise" icon={"plus"} />
      </InputField>
      <InputField title="Minimum Sets">
        {/* TODO: add numeric input component */}
        <TextInput placeholder="3" />
      </InputField>
    </>
  );
}

const styles = StyleSheet.create({
  exerciseVariationTitle: {
    color: Colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  exerciseVariationText: {
    color: Colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
});
