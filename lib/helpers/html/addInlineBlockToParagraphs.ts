export const addInlineBlockToParagraphs = (htmlString: string) => {
  // Create a temporary DOM element to hold the HTML string
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;

  // Select all <p> elements within the temporary DOM
  const paragraphs = tempElement.querySelectorAll('p');

  // Add the inline-block style to each <p> element
  paragraphs.forEach((p) => {
    p.style.display = 'inline-block';
  });

  // Return the modified HTML as a string
  return tempElement.innerHTML;
};
