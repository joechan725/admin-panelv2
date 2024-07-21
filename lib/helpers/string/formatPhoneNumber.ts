export const formatPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return undefined;
  }

  return phoneNumber.slice(0, 4) + ' ' + phoneNumber.slice(4, 8);
};
