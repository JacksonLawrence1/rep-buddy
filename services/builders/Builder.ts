import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export abstract class Builder {
  name: string = "";
  id?: number;
  setState?: React.Dispatch<React.SetStateAction<any>>;

  abstract save(dispatcher: Dispatch<UnknownAction>): Promise<void>;
}
