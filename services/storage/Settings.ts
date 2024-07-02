import AsyncStorage from "@react-native-async-storage/async-storage";

import { weightUnit } from "@/constants/types";

interface settings {
  weightUnit: weightUnit;
}

export default class Settings {
  dateOptions: Intl.DateTimeFormatOptions;
  private _settings: settings;

  constructor() {
    this.dateOptions = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
    this._settings = {
      weightUnit: "kg",
    };
  }

  // save settings to AsyncStorage
  async save(): Promise<void> {
    const settings: settings = {
      weightUnit: this.weightUnit,
    };

    await AsyncStorage.setItem("settings", JSON.stringify(settings));
  }

  // load settings from AsyncStorage
  // NOTE: by default, this doesn't get called on instance creation, so you must call it manually
  async load(): Promise<void> {
    const settings = await AsyncStorage.getItem("settings");

    if (settings) {
      const parsedSettings: settings = JSON.parse(settings);
      this.weightUnit = parsedSettings.weightUnit;
    }
  }

  set weightUnit(unit: weightUnit) {
    this._settings.weightUnit = unit;
  }

  get weightUnit(): weightUnit {
    return this._settings.weightUnit;
  }
  
  get settings(): settings {
    return this._settings;
  }

  // pass date as an ISO string, as stored in the database
  convertDate(date: string): string {
    const dateInstance: Date = new Date(date);
    return dateInstance.toLocaleString("en-US", this.dateOptions);
  }

  convertDateObject(date: Date): string {
    return date.toLocaleString("en-US", this.dateOptions);
  }
}
