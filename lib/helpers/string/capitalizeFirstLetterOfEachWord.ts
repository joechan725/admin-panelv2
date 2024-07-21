export const capitalizeFirstLetterOfEachWord = (string: string) => {
  const words = string.split(' ');

  const newWords = words.map((word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });

  const newString = newWords.join(' ');

  return newString;
};
