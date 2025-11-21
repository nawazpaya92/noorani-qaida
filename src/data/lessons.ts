export type Lesson = {
  id: string;
  title: string;
  arabic: string;
  transliteration?: string;
  notes?: string;
  audio?: string; // placeholder path or URL
};

export const lessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Lesson 1 — Arabic Letters (Alif — Baa)',
    arabic: 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ',
    transliteration: 'Alif, Baa, Taa, Thaa, Jeem, Haa, Khaa, ...',
    notes: 'Start with learning basic letters and sounds.',
  },
  {
    id: 'l2',
    title: 'Lesson 2 — Madd and Sukoon',
    arabic: 'مَدّ و سُكُون',
    transliteration: 'Madd and Sukoon',
    notes: 'Simple explanation for elongation and silence.',
  },
  {
    id: 'l3',
    title: 'Lesson 3 — Tanween and Nunation',
    arabic: 'تنوين',
    transliteration: 'Tanween',
    notes: 'Practice examples with tanween.',
  },
];

export default lessons;
