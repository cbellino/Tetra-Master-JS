import * as R from "ramda";

export const getNext = R.curry((list: any[], item) => {
  const nextIndex = list.indexOf(item) + 1;
  return list[nextIndex % list.length];
});

export const addItemsToList = (items: any[]) => (list: any[]) => [
  ...list,
  ...items,
];

export const addItemToList = (item: any) => addItemsToList([item]);

export const filterItems = (filter: (a: any) => boolean) => (list: any[]) => {
  return list.filter(filter);
};
