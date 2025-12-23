export type ArabicLetter = {
  id: number;
  letter: string;
  audio: any;
};

export const arabicLetters: ArabicLetter[] = [
  { id: 1, letter: "ا", audio: require("../assets/audio/letters/alif.m4a") },
  { id: 2, letter: "ب", audio: require("../assets/audio/letters/baa.m4a") },
  { id: 3, letter: "ت", audio: require("../assets/audio/letters/taa.m4a") },
  { id: 4, letter: "ث", audio: require("../assets/audio/letters/saa.m4a") },
  { id: 5, letter: "ج", audio: require("../assets/audio/letters/jeem.m4a") },
  { id: 6, letter: "ح", audio: require("../assets/audio/letters/haa.m4a") },
  { id: 7, letter: "خ", audio: require("../assets/audio/letters/khaa.m4a") },
  { id: 8, letter: "د", audio: require("../assets/audio/letters/daal.m4a") },
  { id: 9, letter: "ذ", audio: require("../assets/audio/letters/zaal.m4a") },
  { id: 10, letter: "ر", audio: require("../assets/audio/letters/raa.m4a") },
  { id: 11, letter: "ز", audio: require("../assets/audio/letters/zaa.m4a") },
  { id: 12, letter: "س", audio: require("../assets/audio/letters/seen.m4a") },
  { id: 13, letter: "ش", audio: require("../assets/audio/letters/sheen.m4a") },
  { id: 14, letter: "ص", audio: require("../assets/audio/letters/swaad.m4a") },
  { id: 15, letter: "ض", audio: require("../assets/audio/letters/dwaad.m4a") },
  { id: 16, letter: "ط", audio: require("../assets/audio/letters/twaa.m4a") },
  { id: 17, letter: "ظ", audio: require("../assets/audio/letters/zwaa.m4a") },
  { id: 18, letter: "ع", audio: require("../assets/audio/letters/aeen.m4a") },
  { id: 19, letter: "غ", audio: require("../assets/audio/letters/gwaeen.m4a") },
  { id: 20, letter: "ف", audio: require("../assets/audio/letters/faa.m4a") },
  { id: 21, letter: "ق", audio: require("../assets/audio/letters/qaaf.m4a") },
  { id: 22, letter: "ك", audio: require("../assets/audio/letters/kaaf.m4a") },
  { id: 23, letter: "ل", audio: require("../assets/audio/letters/laam.m4a") },
  { id: 24, letter: "م", audio: require("../assets/audio/letters/meem.m4a") },
  { id: 25, letter: "ن", audio: require("../assets/audio/letters/nun.m4a") },
  { id: 26, letter: "ه", audio: require("../assets/audio/letters/s_haa.m4a") },
  { id: 27, letter: "و", audio: require("../assets/audio/letters/waaw.m4a") },
  { id: 28, letter: "ي", audio: require("../assets/audio/letters/yaa.m4a") },
];
