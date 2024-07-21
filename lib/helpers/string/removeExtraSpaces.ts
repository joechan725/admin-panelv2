export const removeExtraSpaces = (string: string) => {
  const trimmedString = string.replace(/\s+/g, ' ').trim();
  return trimmedString;
};
