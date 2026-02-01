export type ArabicLetter = {
  id: number;
  letter: string;
  audio: any;
  dots: 0 | 1 | 2 | 3;
  group?: 'SEVEN'; // سات حروف
};

export const arabicLetters: ArabicLetter[] = [
  { id: 1, letter: "ا", dots: 0, audio: require("../assets/audio/letters/alif.m4a") },
  { id: 2, letter: "ب", dots: 1, audio: require("../assets/audio/letters/baa.m4a") },
  { id: 3, letter: "ت", dots: 2, audio: require("../assets/audio/letters/taa.m4a") },
  { id: 4, letter: "ث", dots: 3, audio: require("../assets/audio/letters/saa.m4a") },
  { id: 5, letter: "ج", dots: 1, audio: require("../assets/audio/letters/jeem.m4a") },
  { id: 6, letter: "ح", dots: 0, audio: require("../assets/audio/letters/haa.m4a") },
  { id: 7, letter: "خ", dots: 1, group: "SEVEN", audio: require("../assets/audio/letters/khaa.m4a") },
  { id: 8, letter: "د", dots: 0, audio: require("../assets/audio/letters/daal.m4a") },
  { id: 9, letter: "ذ", dots: 1, audio: require("../assets/audio/letters/zaal.m4a") },
  { id: 10, letter: "ر", dots: 0, audio: require("../assets/audio/letters/raa.m4a") },
  { id: 11, letter: "ز", dots: 1, audio: require("../assets/audio/letters/zaa.m4a") },
  { id: 12, letter: "س", dots: 0, audio: require("../assets/audio/letters/seen.m4a") },
  { id: 13, letter: "ش", dots: 3, audio: require("../assets/audio/letters/sheen.m4a") },

  // سات حروف (grouped)
  { id: 14, letter: "ص", dots: 0, group: "SEVEN", audio: require("../assets/audio/letters/swaad.m4a") },
  { id: 15, letter: "ض", dots: 1, group: "SEVEN", audio: require("../assets/audio/letters/dwaad.m4a") },
  { id: 16, letter: "ط", dots: 0, group: "SEVEN", audio: require("../assets/audio/letters/twaa.m4a") },
  { id: 17, letter: "ظ", dots: 1, group: "SEVEN", audio: require("../assets/audio/letters/zwaa.m4a") },
  { id: 18, letter: "ع", dots: 0,  audio: require("../assets/audio/letters/aeen.m4a") },
  
  { id: 19, letter: "غ", dots: 1, group: "SEVEN", audio: require("../assets/audio/letters/gwaeen.m4a") },
  { id: 20, letter: "ف", dots: 1, audio: require("../assets/audio/letters/faa.m4a") },

  { id: 21, letter: "ق", dots: 2, audio: require("../assets/audio/letters/qaaf.m4a") },
  { id: 22, letter: "ك", dots: 0, audio: require("../assets/audio/letters/kaaf.m4a") },
  { id: 23, letter: "ل", dots: 0, audio: require("../assets/audio/letters/laam.m4a") },
  { id: 24, letter: "م", dots: 0, audio: require("../assets/audio/letters/meem.m4a") },
  { id: 25, letter: "ن", dots: 1, audio: require("../assets/audio/letters/nun.m4a") },
  { id: 26, letter: "ه", dots: 0, audio: require("../assets/audio/letters/s_haa.m4a") },
  { id: 27, letter: "و", dots: 0, audio: require("../assets/audio/letters/waaw.m4a") },
  { id: 28, letter: "ي", dots: 2, audio: require("../assets/audio/letters/yaa.m4a") },
];
