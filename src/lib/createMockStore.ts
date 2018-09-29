import { AnyAction, Middleware } from "redux";
import createStore, {
  MockStoreCreator,
  MockStoreEnhanced,
} from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";

import { RootState } from "../store";

type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>;

export const createMockStore = (defaultState?) => {
  const middlewares: Middleware[] = [thunk];
  const mockStoreCreator: MockStoreCreator<
    RootState,
    DispatchExts
  > = createStore<RootState, DispatchExts>(middlewares);
  const store: MockStoreEnhanced<RootState, DispatchExts> = mockStoreCreator(
    defaultState,
  );

  return store;
};
