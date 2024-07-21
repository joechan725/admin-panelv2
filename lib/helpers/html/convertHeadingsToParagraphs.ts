export const convertHeadingsToParagraphs = (html: string) => {
  if (typeof document === 'undefined') {
    return html;
  }

  // Create a temp div and insert the html inside
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;

  // Query the headings
  const headings = tempElement.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((heading) => {
    // Create a new <p> element
    const p = document.createElement('p');

    // Copy attributes from the heading to the new <p> element
    Array.from(heading.attributes).forEach((attr) => {
      p.setAttribute(attr.name, attr.value);
    });

    // Move the contents of the heading to the new <p> element
    while (heading.firstChild) {
      p.appendChild(heading.firstChild);
    }

    // Replace the heading with the new <p> element
    heading.replaceWith(p);
  });

  // Return the updated html
  return tempElement.innerHTML;
};

// First child vs innerHTML

// Performance: Direct node manipulation (firstChild and appendChild) can be more efficient and result in fewer reflows and repaints.
// Event Listeners: Using firstChild preserves any event listeners attached to the elements.
// Security: Direct node manipulation avoids the risks associated with setting innerHTML, which can introduce XSS vulnerabilities if not handled carefully.
