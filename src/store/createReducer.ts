import * as R from "ramda";
import { RootState } from "./root.reducer";

export const createReducer = (
  key: string,
  defaultState: object,
  action: { type: string; payload?: object },
  actions,
  rootState: RootState,
) => {
  const { type, payload } = action;

  const conditions = actions.map(([actionType, reducer]) => [
    R.equals(actionType),
    () => R.prop(key)(reducer(payload)(rootState)),
  ]);

  return R.cond([
    ...conditions,
    [R.T, R.always(R.defaultTo(defaultState, rootState[key]))],
  ])(type);
};
