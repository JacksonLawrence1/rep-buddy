import { AlertContextProps } from "@/components/primitives/Alert";
import { createContext } from "react";

const defaultAlertSettings: AlertContextProps = { enabled: false };

export const WorkoutPickerContext = createContext<AlertContextProps>(defaultAlertSettings);

