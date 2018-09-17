import * as R from "ramda";

// TODO: Add unit tests.
export const createReducer = (
  reducerKey,
  state,
  action,
  actions,
  rootState,
) => {
  const { type, payload } = action;

  const conditions = actions.map(([actionType, reducer]) => [
    R.equals(actionType),
    () => R.prop(reducerKey)(reducer(payload)(rootState)),
  ]);

  return R.cond([...conditions, [R.T, R.always(state)]])(type);
};
