import { getNext } from "./list";

describe("getNext", () => {
  describe("when the end is not reached", () => {
    it("should return the next item ('2')", () => {
      expect(getNext(["1", "2"])("1")).toBe("2");
    });
  });

  describe("when the end is reached", () => {
    it("should loop around and return the first item ('1')", () => {
      expect(getNext(["1", "2"])("2")).toBe("1");
    });
  });
});
