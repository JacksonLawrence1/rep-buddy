import { useState } from 'react';

import exerciseService from '@/services/storage/ExerciseService';

export const useExerciseService = () => {
  const [exercises, setExercises] = useState(exerciseService.dataAsArray);

  exerciseService.subscribe(() => {
    setExercises(exerciseService.dataAsArray);
  });

  return exercises;
}
