import ExerciseBuilderComponent from "@/components/exercises/ExerciseBuilder";

import { onBack, onSave } from "./index";

export default function ExerciseBuilderNoID() {
  return <ExerciseBuilderComponent onSave={onSave} onBack={onBack} />;
}
