export const filterUniqueObjects = <T extends Object>(data: T[], fieldName: keyof T): T[] => {
  return data.filter((obj, index, self) => index === self.findIndex((t) => t[fieldName] === obj[fieldName]));
};
