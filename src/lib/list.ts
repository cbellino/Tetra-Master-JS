export const getNext = (list: any[]) => (item: any) => {
  const nextIndex = list.indexOf(item) + 1;

  return list[nextIndex % list.length];
};
