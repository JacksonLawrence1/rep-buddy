import { Exercise } from "@/constants/types";

class ExerciseProvider {
  subscribers: Set<(exercise: Exercise) => void>;

  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback: (exercise: Exercise) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  clearSubscribers() {
    this.subscribers.clear();
  }

  pickExercise(exercise: Exercise) {
    this.subscribers.forEach((callback) => callback(exercise));
  }
}

const exerciseProvider = new ExerciseProvider();
export default exerciseProvider;
