export function getUnique(item, index, self) {
  return index === self.findIndex((t) => t.id === item.id);
}
