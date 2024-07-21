export const getPlainTextFromHtml = (html?: string) => {
  if (!html) {
    return '';
  }
  if (typeof document === 'undefined') {
    return html;
  }

  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;

  const traverseAndAddSpaces = (node: Node): string => {
    let text = '';
    const childNodesArray = Array.prototype.slice.call(node.childNodes);
    for (const child of childNodesArray) {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.nodeValue;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        text += ' ' + traverseAndAddSpaces(child);
      }
    }
    return text;
  };

  const plainText = traverseAndAddSpaces(tempElement).trim();
  return plainText;
};
