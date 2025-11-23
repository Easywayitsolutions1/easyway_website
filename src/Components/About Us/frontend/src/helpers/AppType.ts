import { ChangeEvent , KeyboardEvent} from "react";

export type TReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type TOnChangeInput = ChangeEvent<HTMLInputElement>;

export type TOnChangeSelect = ChangeEvent<HTMLSelectElement>;
export type TOnChangeTextArea = ChangeEvent<HTMLTextAreaElement>;
export type TOnTextAreaEvent= KeyboardEvent<HTMLTextAreaElement>;
export type TOnKeyboardEvent= KeyboardEvent<HTMLInputElement>;
