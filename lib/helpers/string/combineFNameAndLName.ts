import { capitalizeFirstLetterOfEachWord } from './capitalizeFirstLetterOfEachWord';

interface CombineFNameAndLNameProps {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  fallbackName: string;
}

export const combineFNameAndLName = ({ firstName, lastName, fallbackName }: CombineFNameAndLNameProps) => {
  if (firstName && lastName) {
    const capitalizedFirstName = capitalizeFirstLetterOfEachWord(firstName);
    const capitalizedLastName = capitalizeFirstLetterOfEachWord(lastName);
    return capitalizedFirstName + ' ' + capitalizedLastName;
  }

  if (firstName) {
    const capitalizedFirstName = capitalizeFirstLetterOfEachWord(firstName);
    return capitalizedFirstName;
  }

  if (lastName) {
    const capitalizedLastName = capitalizeFirstLetterOfEachWord(lastName);
    return capitalizedLastName;
  }

  return fallbackName;
};
