import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export abstract class Builder {
  setState?: React.Dispatch<React.SetStateAction<any>>;

  abstract save(dispatcher: Dispatch<UnknownAction>): { title: string; message: string } | undefined;
}
