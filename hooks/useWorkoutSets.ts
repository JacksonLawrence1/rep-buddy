import { useCallback, useState } from 'react';

import WorkoutBuilder from '@/services/builders/WorkoutBuilder';

import { Exercise } from '@/constants/types';
import exerciseProvider from '@/services/ExerciseProvider';
import { router } from 'expo-router';

export default function useWorkoutSets(workoutBuilder: WorkoutBuilder) {
  const [workoutSets, setWorkoutSets] = useState(workoutBuilder.workoutSets);

  const updateWorkoutSets = useCallback(() => {
    setWorkoutSets([...workoutBuilder.workoutSets]);
  }, [workoutBuilder]);

  const pickExercise = useCallback((callback: (exercise: Exercise) => void) => {
    // navigate to exercise picker
    router.navigate('/exercises/picker');
    exerciseProvider.subscribe((exercise) => {
      callback(exercise);
      updateWorkoutSets();
    })
  }, [updateWorkoutSets]);

  const deleteExercise = useCallback((index: number) => {
    workoutBuilder.deleteExercise(index);
    updateWorkoutSets();
  }, [workoutBuilder, updateWorkoutSets]);

  return { workoutSets, pickExercise, deleteExercise };
}
