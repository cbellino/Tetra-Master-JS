import * as R from "ramda";

export const getNext = R.curry((list: any[], item) => {
  const nextIndex = list.indexOf(item) + 1;
  return list[nextIndex % list.length];
});

// TODO: Add unit tests.
export const addItemsToList = (items: any[]) => (list: any[]) => [
  ...list,
  ...items,
];

// TODO: Add unit tests.
export const addItemToList = (item: any) => addItemsToList([item]);
