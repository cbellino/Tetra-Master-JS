import { createReducer } from "./createReducer";

describe("createReducer", () => {
  it("should create a reducer with a default state", () => {
    const defaultState = {};
    const rootState: any = {};
    const actions = [];

    const reducer = createReducer(
      "test",
      defaultState,
      { type: "HELLO" },
      actions,
      rootState,
    );

    expect(reducer).toEqual({});
  });

  it("should create a reducer handling the action 'HELLO'", () => {
    const defaultState = {};
    const rootState: any = {};
    const helloReducer = payload => state => ({
      test: {
        hello: "world",
      },
    });
    const actions = [["HELLO", helloReducer]];

    const reducer = createReducer(
      "test",
      defaultState,
      { type: "HELLO" },
      actions,
      rootState,
    );

    expect(reducer).toEqual({ hello: "world" });
  });
});
