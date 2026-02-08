const dummyTiming = [0]; // ⏱ replace later with real timings

export const majmuaaAndMurakkabat = [
    /** =========================
     * 1️⃣ پہلا مجموعہ
     * ========================= */
    {
        id: 'ba-ta-sa',
        title: 'پہلا مجموعہ (ب ت ث ن ی)',


        majmuaa: [
            createMajmuaa(1, 'ب', 'بـ', 'ـبـ', 'ـب', 'baa'),
            createMajmuaa(2, 'ت', 'تـ', 'ـتـ', 'ـت', 'taa'),
            createMajmuaa(3, 'ث', 'ثـ', 'ـثـ', 'ـث', 'saa'),
            createMajmuaa(4, 'ن', 'نـ', 'ـنـ', 'ـن', 'nun'),
            createMajmuaa(5, 'ی', 'یـ', 'ـیـ', 'ـی', 'yaa'),
        ],

        murakkabat: [
            createMurakkab(1, 'ب', 'بط', 'طبو', 'بظب', 'ببب', 'baa'),
            createMurakkab(2, 'ت', 'تز', 'بتر', 'تظت', 'تتت', 'taa'),
            createMurakkab(3, 'ث', 'ثو', 'طثت', 'یث', 'ثثث', 'saa'),
            createMurakkab(4, 'ن', 'نب', 'بنت', 'طن', 'ننن', 'nun'),
            createMurakkab(5, 'ی', 'ید', 'طین', 'نی', 'ییی', 'yaa'),
        ],
    },

    /** =========================
     * 2️⃣ دوسرا مجموعہ
     * ========================= */
    {
        id: 'laam',
        title: 'دوسرا مجموعہ (ل)',

        majmuaa: [
            createMajmuaa(1, 'ل', 'لـ', 'ـلـ', 'ـل', 'laam'),
        ],

        murakkabat: [
            createMurakkab(1, 'ل', 'لا', 'لب', 'بل', 'للل', 'laam'),
        ],
    },

    /** =========================
     * 3️⃣ ج ح خ
     * ========================= */
    {
        id: 'geem-haa-khaa',
        title: 'تیسرا مجموعہ (ج ح خ)',

        majmuaa: [
            createMajmuaa(1, 'ج', 'جـ', 'ـجـ', 'ـج', 'jeem'),
            createMajmuaa(2, 'ح', 'حـ', 'ـحـ', 'ـح', 'haa'),
            createMajmuaa(3, 'خ', 'خـ', 'ـخـ', 'ـخ', 'khaa'),
        ],

        murakkabat: [
            createMurakkab(1, 'ج', 'جب', 'تخن', 'تج', 'ججج', 'jeem'),
            createMurakkab(2, 'ح', 'حل', 'بحر', 'تح', 'ححح', 'haa'),
            createMurakkab(3, 'خ', 'خل', 'تجل', 'تخ', 'خخخ', 'khaa'),
        ],
    },

    /** =========================
     * 4️⃣ س ش
     * ========================= */
    {
        id: 'seen-shin',
        title: 'چوتھا مجموعہ (س ش)',

        majmuaa: [
            createMajmuaa(1, 'س', 'سـ', 'ـسـ', 'ـس', 'seen'),
            createMajmuaa(2, 'ش', 'شـ', 'ـشـ', 'ـش', 'sheen'),
        ],

        murakkabat: [
            createMurakkab(1, 'س', 'سر', 'لست', 'نس', 'سسسس', 'seen'),
            createMurakkab(2, 'ش', 'شط', 'بشر', 'تش', 'شششش', 'sheen'),
        ],
    },

    /** =========================
     * 5️⃣ ص ض
     * ========================= */
    {
        id: 'swaad-duwaad',
        title: 'پانچواں مجموعہ (ص ض)',

        majmuaa: [
            createMajmuaa(1, 'ص', 'صـ', 'ـصـ', 'ـص', 'swaad'),
            createMajmuaa(2, 'ض', 'ضـ', 'ـضـ', 'ـض', 'dwaad'),
        ],

        murakkabat: [
            createMurakkab(1, 'ص', 'صل', 'نصب', 'نص', 'صصص', 'swaad'),
            createMurakkab(2, 'ض', 'ضر', 'يضل', 'لض', 'ضضض', 'dwaad'),
        ],
    },

    /** =========================
     * 6️⃣ ع غ
     * ========================= */
    {
        id: 'aeen-gwaeen',
        title: 'چھٹا مجموعہ (ع غ)',

        majmuaa: [
            createMajmuaa(1, 'ع', 'عـ', 'ـعـ', 'ـع', 'aeen'),
            createMajmuaa(2, 'غ', 'غـ', 'ـغـ', 'ـغ', 'gwaeen'),
        ],
        murakkabat: [
            createMurakkab(1, 'ع', 'عن', 'بعد', 'لع', 'ععع', 'aeen'),
            createMurakkab(2, 'غ', 'غض', 'لغد', 'صغ', 'غغغ', 'gwaeen'),
        ],
    },

    /** =========================
     * 7️⃣ ف ق
     * ========================= */
    {
        id: 'faa-qaaf',
        title: 'ساتواں مجموعہ (ف ق)',

        majmuaa: [

            createMajmuaa(1, 'ف', 'فـ', 'ـفـ', 'ـف', 'faa'),
            createMajmuaa(2, 'ق', 'قـ', 'ـقـ', 'ـق', 'qaaf'),
        ],

        murakkabat: [
            createMurakkab(1, 'ف', 'فظ', 'خفت', 'صف', 'فقف', 'faa'),
            createMurakkab(2, 'ق', 'قل', 'نقص', 'حق', 'ققق', 'qaaf'),
        ],
    },

    /** =========================
     * 8️⃣ ک م ہ
     * ========================= */
    {
        id: 'kaaf',
        title: 'آٹھواں مجموعہ (ک م ہ)',

        majmuaa: [

            createMajmuaa(1, 'ک', 'کـ', 'ـکـ', 'ـک', 'kaaf'),
            createMajmuaa(2, 'م', 'مـ', 'ـمـ', 'ـم', 'meem'),
            createMajmuaa(3, 'ہ', 'ہـ', 'ـہـ', 'ـہ', 's_haa'),
        ],

        murakkabat: [
            createMurakkab(1, 'ک', 'کن', 'لکن', 'نک', 'ککک', 'kaaf'),
            createMurakkab(2, 'م', 'من', 'لمن', 'ہم', 'ممم', 'meem'),
            createMurakkab(3, 'ہ', 'ہن', 'جہن', 'بہ', 'ہہہ', 's_haa'),
        ],
    },
];

/** =========================
 * 🔧 Helper creator
 * ========================= */
import { lettersAudio, LetterAudioKey } from '../components/lettersAudio';
import { murakkabatAudio, MurakkabKey } from '../components/murakkabatAudio'

function createMurakkab(
    id: number,
    base: string,
    initial: MurakkabKey,
    medial: MurakkabKey,
    final: MurakkabKey,
    group: MurakkabKey,
    letterAudioName: LetterAudioKey
) {
    return {
        id,
        base: {
            text: base,
            audio: lettersAudio[letterAudioName], // ✅ static-safe
            timings: dummyTiming,
        },
        initial: {
            text: initial,
            audio: murakkabatAudio[initial],
            timings: [0, 1000, 2000],
        },
        medial: {
            text: medial,
            audio: murakkabatAudio[medial],
            timings: [0, 1000, 2000],
        },
        final: {
            text: final,
            audio: murakkabatAudio[final],
            timings: dummyTiming,
        },
        group: {
            text: group,
            audio: murakkabatAudio[group],
            timings: dummyTiming,
        },
    };
}
function createMajmuaa(
    id: number,
    isolated: string,
    initial: string,
    medial: string,
    final: string,
    letterAudioName: LetterAudioKey
) {
    const audio = lettersAudio[letterAudioName]; // ⭐ single source
    return {
        id,
        isolated: {
            text: isolated,
            audio: audio, // ✅ static-safe
            timings: dummyTiming,
        },
        initial: {
            text: initial,
            audio: audio,
            timings: [0, 1000, 2000],
        },
        medial: {
            text: medial,
            audio: audio,
            timings: [0, 1000, 2000],
        },
        final: {
            text: final,
            audio: audio,
            timings: dummyTiming,
        },

    };
}


/** =========================
 * 🧪 Test sample
 * ========================= */
export const test = [
    {
        text: 'کمہ',
        audio: require('../assets/audio/letters/laam.m4a'),
        timings: [0, 350, 700],
    },
];
