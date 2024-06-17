import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export abstract class Builder {
  abstract save(dispatcher: Dispatch<UnknownAction>): { title: string; message: string } | undefined;
}
