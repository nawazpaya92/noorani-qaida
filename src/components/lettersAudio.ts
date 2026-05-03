import { basicLettersAudio } from "../audio/letters/basic";
import { murakkabatUmumiAudio } from "../audio/murakkabat/umumi";
import { murakkabatFilAsmaAudio } from "../audio/murakkabat/filAsma";
import { zabarAudio } from "../audio/harkaat/zabar";
import { zerAudio } from "../audio/harkaat/zer";
import { hurufeMaddahAudio } from "../audio/hurufeMaddah";
import { yaaMaddahAudio } from "../audio/hurufeMaddah/yaaMaddah";

export const lettersAudio = {
  ...basicLettersAudio,
  ...murakkabatUmumiAudio,
  ...murakkabatFilAsmaAudio,
  ...zabarAudio,
  ...zerAudio,
  ...hurufeMaddahAudio,
  ...yaaMaddahAudio,
} as const;

export type LetterAudioKey = keyof typeof lettersAudio;

export {
  basicLettersAudio,
  murakkabatUmumiAudio,
  murakkabatFilAsmaAudio,
  zabarAudio,
  zerAudio,
  hurufeMaddahAudio,
  yaaMaddahAudio,
};
