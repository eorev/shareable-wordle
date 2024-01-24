import { default as GraphemeSplitter } from 'grapheme-splitter';
import { getGuessStatuses } from './statuses';

export const isWinningWord = (word: string, solution: string) => {
  return localeAwareLowerCase(word) === localeAwareLowerCase(solution);
};

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word);
};

export const localeAwareLowerCase = (text: string) => {
  return text.toLocaleLowerCase();
};

export const localeAwareUpperCase = (text: string) => {
  return text.toLocaleUpperCase();
};