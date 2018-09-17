import { RootState } from "../store";

export type Selector<T> = (rootState: RootState) => T;
