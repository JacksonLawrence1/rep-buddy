import { useCallback, useState } from 'react';

import WorkoutBuilder from '@/services/builders/WorkoutBuilder';

import { Exercise } from '@/constants/types';

export default function useWorkoutSets(workoutBuilder: WorkoutBuilder) {
  const [workoutSets, setWorkoutSets] = useState(workoutBuilder.workoutSets);

  const updateWorkoutSets = useCallback(() => {
    setWorkoutSets([...workoutBuilder.workoutSets]);
  }, [workoutBuilder]);

  const addExercise = useCallback((exercise: Exercise) => {
    workoutBuilder.addExercise(exercise);
    updateWorkoutSets();
  }, [workoutBuilder, updateWorkoutSets]);

  const replaceExercise = useCallback((exercise: Exercise, index: number) => {
    workoutBuilder.replaceExercise(exercise, index);
    updateWorkoutSets();
  }, [workoutBuilder, updateWorkoutSets]);

  const deleteExercise = useCallback((index: number) => {
    workoutBuilder.deleteExercise(index);
    updateWorkoutSets();
  }, [workoutBuilder, updateWorkoutSets]);

  return { workoutSets, addExercise, replaceExercise, deleteExercise };
}
