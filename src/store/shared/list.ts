export const getNext = (list: any[]) => (item: any) => {
  const nextIndex = list.indexOf(item) + 1;
  if (nextIndex >= list.length) {
    return list[0];
  }
  return list[nextIndex];
};
