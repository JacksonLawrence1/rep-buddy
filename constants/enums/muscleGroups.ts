export enum MuscleGroup {
  CHEST = 'Chest',
  SHOULDERS = 'Shoulders',
  BACK = 'Back',
  BICEPS = 'Biceps',
  TRICEPS = 'Triceps',
  LEGS = 'Legs',
  ABS = 'Abs',
  FULL_BODY = 'Full Body',
}

export type MuscleGroupStrings = keyof typeof MuscleGroup;

// get MuscleGroup values as strings
export const MuscleGroups: string[] = (
  Object.keys(MuscleGroup) as (keyof typeof MuscleGroup)[]
).map((key) => MuscleGroup[key]);
