export const isValidDateString = (
  string?: string | null,
  format: 'yyyy-mm-ddThh:mm' | 'yyyy-mm-dd' | 'yyyy-mm' | 'yyyy' = 'yyyy-mm-ddThh:mm'
): boolean => {
  if (!string) {
    return false;
  }

  if (format === 'yyyy-mm-ddThh:mm') {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(string);
  }
  if (format === 'yyyy-mm-dd') {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(string);
  }

  if (format === 'yyyy-mm') {
    const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
    return regex.test(string);
  }
  const regex = /^\d{4}$/;
  return regex.test(string);
};
