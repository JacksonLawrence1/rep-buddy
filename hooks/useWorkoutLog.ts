import { useCallback, useState } from 'react';

import LogBuilder from '@/services/builders/LogBuilder';

import { Exercise, LogExerciseSet } from '@/constants/types';

export default function useWorkoutLog(logBuilder: LogBuilder) {
  const [exercises, setExercises] = useState<LogExerciseSet[]>(logBuilder.sets);

  const updateExercises = useCallback(() => {
    setExercises([...logBuilder.sets]);
  }, [logBuilder]);

  const addExercise = useCallback((exercise: Exercise) => {
    logBuilder.addExercise(exercise);
    updateExercises();
  }, [logBuilder, updateExercises]);

  const swapExercise = useCallback((exercise: Exercise, index: number) => {
    logBuilder.swapExercise(index, exercise);
    updateExercises();
  }, [logBuilder, updateExercises]);

  const removeExercise = useCallback((index: number) => {
    logBuilder.removeExercise(index);
    updateExercises();
  }, [logBuilder, updateExercises]);

  return { exercises, addExercise, swapExercise, removeExercise };
}
