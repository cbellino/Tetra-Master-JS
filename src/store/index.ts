import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

import { rootReducer } from "./root";

const middlewares = [
  immutableStateInvariantMiddleware(), // TODO: Enable only in development mode.
  thunk,
];

export function configureStore(initialState = {}) {
  const store: any = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
}

export * from "./root";
export * from "./board";
export * from "./players";
export * from "./tiles";
export * from "./turn";
export * from "./game";
