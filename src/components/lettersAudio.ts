import { basicLettersAudio } from '../audio/letters/basic';
import { murakkabatUmumiAudio } from '../audio/murakkabat/umumi';
import { murakkabatFilAsmaAudio } from '../audio/murakkabat/filAsma';
import { zabarAudio } from '../audio/harkaat/zabar';
import { hurufeMaddahAudio } from '../audio/hurufeMaddah';

export const lettersAudio = {
  ...basicLettersAudio,
  ...murakkabatUmumiAudio,
  ...murakkabatFilAsmaAudio,
  ...zabarAudio,
  ...hurufeMaddahAudio,
} as const;

export type LetterAudioKey = keyof typeof lettersAudio;

export {
  basicLettersAudio,
  murakkabatUmumiAudio,
  murakkabatFilAsmaAudio,
  zabarAudio,
  hurufeMaddahAudio,
};
