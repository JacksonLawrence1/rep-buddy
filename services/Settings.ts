import { weightUnit } from "@/constants/types";

export default class Settings {
  weightUnit: weightUnit;
  dateOptions: Intl.DateTimeFormatOptions;

  constructor() {
    this.weightUnit = "kg";
    this.dateOptions = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
  }

  changeWeightUnit(unit: weightUnit): void {
    this.weightUnit = unit;
  }

  // pass date as an ISO string, as stored in the database
  convertDate(date: string): string {
    const dateInstance: Date = new Date(date);
    return dateInstance.toLocaleString("en-US", this.dateOptions);
  }
}
