export const getById = (id, arr) => {
  const found = arr.find((obj) => obj.id === id);
  if (!found) return;
  return found;
};
