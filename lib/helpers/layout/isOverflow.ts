export const isOverflow = (element?: HTMLElement | null) => {
  if (!element) {
    return false;
  }
  return element.offsetWidth < element.scrollWidth || element.offsetHeight < element.scrollHeight;
};
