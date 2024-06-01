import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import DefaultPage from '@/components/DefaultPage';
import Button from '@/components/Buttons/Button';

import { colors } from '@/constants/colors';
import InputField from '@/components/inputs/InputField';
import Option from '@/components/inputs/Option';
import ExerciseVariation from '@/components/ExerciseVariation';


// TODO: use enum here, but seems very difficult with generic types, revisit later
type variations = 'single' | 'choice' | string;
const variationOptions: variations[] = ['single', 'choice'] as const;

export default function AddExercise() {
  const [variation, setVariation] = useState('single');
  
  // so we don't need to pass the verbose <Dispatch<SetStateAction<string>>> type
  const handleVariationChange = (value: string) => {
    if (typeof value === typeof variation) {
      setVariation(value);
    }
  }
  
  return (
    <DefaultPage title="New Exercise" back>
      <View style={styles.exerciseContainer}>
        <InputField title="Exercise Variation">
          <Option options={variationOptions} selected={variation} select={handleVariationChange} />

          {/* shouldn't be inside InputField, but z-index not working properly */}
          <View style={{zIndex: -1, paddingTop: 8}}>
            <ExerciseVariation choice={variation} />
          </View>
        </InputField>
      </View>
      <Button theme="primary" label="Save" />
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    flex: 1,
    alignSelf: 'stretch', // thank you
    backgroundColor: colors.backgroundDark, 
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 50,
    color: colors.text,
  },
});
