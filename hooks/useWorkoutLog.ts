import { useCallback, useState } from 'react';
import { router } from 'expo-router';

import LogBuilder from '@/services/builders/LogBuilder';

import { Exercise, LogExerciseSet } from '@/constants/types';
import exerciseProvider from '@/services/ExerciseProvider';

export default function useWorkoutLog(logBuilder: LogBuilder) {
  const [exercises, setExercises] = useState<LogExerciseSet[]>(logBuilder.sets);

  const updateExercises = useCallback(() => {
    setExercises([...logBuilder.sets]);
  }, [logBuilder]);

  const pickExercise = useCallback((callback: (exercise: Exercise) => void) => {
    // navigate to exercise picker
    router.navigate('/exercises/picker');
    exerciseProvider.subscribe((exercise) => {
      callback(exercise);
      updateExercises();
    })
  }, [updateExercises]);

  const removeExercise = useCallback((index: number) => {
    logBuilder.removeExercise(index);
    updateExercises();
  }, [logBuilder, updateExercises]);

  return { exercises, pickExercise, removeExercise };
}
