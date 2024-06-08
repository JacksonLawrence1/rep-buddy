import { weightUnit } from "@/constants/types";

export default class Settings {
  weightUnit: weightUnit;

  constructor() {
    this.weightUnit = "kg";
  }
}
