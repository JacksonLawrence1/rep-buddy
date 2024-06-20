import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export abstract class Builder {
  id?: number;
  setState?: React.Dispatch<React.SetStateAction<any>>;

  abstract save(dispatcher: Dispatch<UnknownAction>): Promise<void>;
}
