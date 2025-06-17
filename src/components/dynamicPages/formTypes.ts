import type { JSX } from "react";

export type Field = {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
  value?: string | boolean;
};

export type SetFieldsState = React.Dispatch<React.SetStateAction<Field[] | null>>;

export type HandleChangeFn = (
  index: number,
  value: string | boolean,
  setFields: SetFieldsState,
  pageId: string
) => void;

export type RenderFieldFn = (
  field: Field,
  idx: number,
  setFields: SetFieldsState,
  pageId: string
) => JSX.Element | null;
