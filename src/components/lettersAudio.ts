import { basicLettersAudio } from "../audio/letters/basic";
import { murakkabatUmumiAudio } from "../audio/murakkabat/umumi";
import { murakkabatFilAsmaAudio } from "../audio/murakkabat/filAsma";
import { zabarAudio } from "../audio/harkaat/zabar";
import { zerAudio } from "../audio/harkaat/zer";
import { hurufeMaddahAudio } from "../audio/hurufeMaddah";
import { yaaMaddahAudio } from "../audio/hurufeMaddah/yaaMaddah";
import { yaaElinAudio } from "../audio/hurufeLeen/yaaElin";

export const lettersAudio = {
  ...basicLettersAudio,
  ...murakkabatUmumiAudio,
  ...murakkabatFilAsmaAudio,
  ...zabarAudio,
  ...zerAudio,
  ...hurufeMaddahAudio,
  ...yaaMaddahAudio,
  ...yaaElinAudio,
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
  yaaElinAudio,
};
