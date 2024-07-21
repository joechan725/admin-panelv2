type Type = 'digit-only' | 'letter-only' | 'digit-letter' | 'digit-letter-symbol';
type LetterCase = 'uppercase' | 'lowercase' | 'both';

interface OverloadType {
  (length: number, type: 'digit-only'): string;
  (length: number, type: 'letter-only' | 'digit-letter' | 'digit-letter-symbol', letterCase: LetterCase): string;
}

export const generateRandomCode: OverloadType = (length: number, type: Type, letterCase?: LetterCase) => {
  let characters = '';
  const digits = '0123456789';
  const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
  const lettersUpper = lettersLower.toUpperCase();
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  switch (type) {
    case 'digit-only':
      characters = digits;
      break;
    case 'digit-letter':
      characters = digits;
      switch (letterCase) {
        case 'uppercase':
          characters += lettersUpper;
          break;
        case 'lowercase':
          characters += lettersLower;
          break;
        case 'both':
          characters += lettersLower + lettersUpper;
          break;
        default:
          characters += lettersLower + lettersUpper;
          break;
      }
      break;
    case 'digit-letter-symbol':
      characters = digits;
      switch (letterCase) {
        case 'uppercase':
          characters += lettersUpper;
          break;
        case 'lowercase':
          characters += lettersLower;
          break;
        case 'both':
          characters += lettersLower + lettersUpper;
          break;
        default:
          characters += lettersLower + lettersUpper;
          break;
      }
      characters += symbols;
      break;
    case 'letter-only':
      switch (letterCase) {
        case 'uppercase':
          characters = lettersUpper;
          break;
        case 'lowercase':
          characters = lettersLower;
          break;
        case 'both':
          characters = lettersLower + lettersUpper;
          break;
        default:
          characters = lettersLower + lettersUpper;
          break;
      }
      break;
    default:
      break;
  }

  let randomCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }

  return randomCode;
};
