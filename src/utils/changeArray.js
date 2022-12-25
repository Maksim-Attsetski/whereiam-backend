export const changeArray = (array, item, remove = false) => {
  if (array) {
    return remove
      ? array.filter((el) => `${el}` !== `${item}`)
      : [...array, item];
  } else {
    return remove ? null : [item];
  }
};
