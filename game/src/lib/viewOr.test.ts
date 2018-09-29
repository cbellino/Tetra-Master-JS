import * as R from "ramda";

import { viewOr } from "./viewOr";

describe("viewOr", () => {
  describe("when the lens returns a value", () => {
    it("should return the id ('1')", () => {
      const result = viewOr(null, R.lensProp("id"))({ id: "1" });

      expect(result).toBe("1");
    });
  });

  describe("when the lens returns a value", () => {
    it("should return the default value (null)", () => {
      const result = viewOr(null, R.lensProp("id"))({});

      expect(result).toBe(null);
    });
  });
});
