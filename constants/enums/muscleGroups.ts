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

// get MuscleGroup values as strings
export default (
  Object.keys(MuscleGroup) as (keyof typeof MuscleGroup)[]
).map((key) => MuscleGroup[key]);
