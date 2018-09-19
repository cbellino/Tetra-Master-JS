import * as R from "ramda";

// TODO: Add unit tests.
export const createReducer = (
  key,
  defaultState,
  action,
  actions,
  rootState,
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
