import { addItemsToList, addItemToList, filterItems, getNext } from "./list";

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

describe("addItemToList", () => {
  it("should add the item to the list and return the new list (['1', '2'])", () => {
    expect(addItemToList("2")(["1"])).toEqual(["1", "2"]);
  });
});

describe("addItemsToList", () => {
  it("should add the items to the list and return the new list (['1', '2'])", () => {
    expect(addItemsToList(["2"])(["1"])).toEqual(["1", "2"]);
  });
});

describe("filterItems", () => {
  it("should filter the items and return the new list (['2'])", () => {
    expect(filterItems(item => item === "2")(["1", "2"])).toEqual(["2"]);
  });
});
