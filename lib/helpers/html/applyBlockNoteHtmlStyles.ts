const colorMap: { [key in string]: string } = {
  gray: '#9B9A97',
  brown: '#64473A',
  red: '#E03E3E',
  orange: '#D9730D',
  yellow: '#DFAB01',
  green: '#4D6461',
  blue: '#0B6E99',
  purple: '#6940A5',
  pink: '#AD1A72',
};

const backgroundColorMap: { [key in string]: string } = {
  gray: '#EBECED',
  brown: '#E9E5E3',
  red: '#FBE4E4',
  orange: '#F6E9D9',
  yellow: '#FBF3DB',
  green: '#DDEDEA',
  blue: '#DDEBF1',
  purple: '#EAE4F2',
  pink: '#F4DFEB',
};

export const applyBlockNoteHtmlStyles = (html: string) => {
  if (typeof document === 'undefined') {
    return html;
  }

  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;

  const elements = tempElement.querySelectorAll('[data-text-color], [data-background-color]');

  elements.forEach((element) => {
    const textColor = element.getAttribute('data-text-color');
    const backgroundColor = element.getAttribute('data-background-color');

    if (textColor) {
      const color = colorMap[textColor] || textColor;
      (element as HTMLElement).style.color = color;
      element.removeAttribute('data-text-color');
    }

    if (backgroundColor) {
      const bgColor = backgroundColorMap[backgroundColor] || backgroundColor;
      (element as HTMLElement).style.backgroundColor = bgColor;
      element.removeAttribute('data-background-color');
    }
  });

  // Apply styles to different html elements
  const heading1s = tempElement.querySelectorAll('h1');
  heading1s.forEach((heading1) => {
    heading1.style.fontSize = '3rem';
    heading1.style.fontWeight = '700';
  });

  const heading2s = tempElement.querySelectorAll('h2');
  heading2s.forEach((heading2) => {
    heading2.style.fontSize = '2rem';
    heading2.style.fontWeight = '700';
  });

  const heading3s = tempElement.querySelectorAll('h3');
  heading3s.forEach((heading3) => {
    heading3.style.fontSize = '1.5rem';
    heading3.style.fontWeight = '600';
  });

  const paragraphs = tempElement.querySelectorAll('p');
  paragraphs.forEach((paragraph) => {
    paragraph.style.fontSize = '1rem';
    paragraph.style.fontWeight = '400';
  });

  const unorderedLists = tempElement.querySelectorAll('ul');
  unorderedLists.forEach((list) => {
    list.style.listStyleType = 'disc';
    list.style.marginLeft = '1rem';
  });

  const orderedLists = tempElement.querySelectorAll('ol');
  orderedLists.forEach((list) => {
    list.style.listStyleType = 'decimal';
    list.style.marginLeft = '1rem';
  });

  // Return the updated html
  return tempElement.innerHTML;
};
