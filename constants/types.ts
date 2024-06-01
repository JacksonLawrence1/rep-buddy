import { MuscleGroup } from "./enums/muscleGroups";

export type Exercise = {
  id: string;
  name: string;
  muscleGroups: MuscleGroup[];
};

