export const populate = async (item, Dto, full) => {
  try {
    const itemDto = new Dto(item);

    if (!full) {
      return itemDto;
    }

    const populatedItem = await item.populate(Object.keys(itemDto));
    return populatedItem;
  } catch (error) {
    return null;
  }
};
