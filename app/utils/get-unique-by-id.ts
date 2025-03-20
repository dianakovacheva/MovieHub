type item = {
  id: number | string;
};

export function getUniqueById(item: item, index: number, self: item[]) {
  return index === self.findIndex((t) => t.id === item.id);
}
