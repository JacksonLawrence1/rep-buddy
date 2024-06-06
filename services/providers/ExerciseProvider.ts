import { Exercise } from "@/constants/types";
import { Service } from "../Service";

class ExerciseProvider extends Service<Exercise> {
    pickExercise(exercise: Exercise) {
        this.notify(exercise);
    } 
}

const exerciseProvider = new ExerciseProvider();
export default exerciseProvider; 
