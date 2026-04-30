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
            createMurakkab(3, 'ث', 'ثو', 'طثت', 'بث', 'ثثث', 'saa'),
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
            createMurakkab(1, 'س', 'سر', 'لست', 'نس', 'سسس', 'seen'),
            createMurakkab(2, 'ش', 'شط', 'بشر', 'تش', 'ششش', 'sheen'),
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
    {
        id: 'hamzah',
        title: 'ہمزہ کی شکلیں',
        isHamzah: true,
        majmuaa: [
            createHamzahMajmuaa(),
        ],

        murakkabat: [], // ⭐ NO murakkabat for hamzah
    },
    {
        id: 'umumi-mashq',
        title: 'عمومی مشق',

        // ❌ No majmuaa
        majmuaa: [],

        // ❌ No normal murakkabat
        murakkabat: [],

        // ✅ NEW FIELD
        umumiMashq: [
            createUmumi(1, 'بسم', 'bism', [0, 2000, 4000]),
            createUmumi(2, 'ملک', 'mulk', [0, 1500, 3000]),
            createUmumi(3, 'یکن', 'yakan'),
            createUmumi(4, 'اہل', 'ahl'),
            createUmumi(5, 'کتب', 'kutub'),

            createUmumi(6, 'بعد', 'baad'),
            createUmumi(7, 'خبر', 'khabar'),
            createUmumi(8, 'جنت', 'jannat'),
            createUmumi(9, 'عدن', 'adan'),
            createUmumi(10, 'رضی', 'razi'),

            createUmumi(11, 'خشیت', 'khashyat'),
            createUmumi(12, 'ثبت', 'sabat'),
            createUmumi(13, 'کسب', 'kasb'),
            createUmumi(14, 'حبل', 'habl'),
            createUmumi(15, 'نصر', 'nasr'),

            createUmumi(16, 'فتح', 'fath'),
            createUmumi(17, 'ربات', 'ribat'),
            createUmumi(18, 'دین', 'deen'),
            createUmumi(19, 'صیف', 'saif'),
            createUmumi(20, 'بیت', 'bait'),

            createUmumi(21, 'جوع', 'joo'),
            createUmumi(22, 'خوف', 'khauf'),
            createUmumi(23, 'الم', 'alam'),
            createUmumi(24, 'کیف', 'kaif'),
            createUmumi(25, 'فعل', 'faal'),

            createUmumi(26, 'فیل', 'feel'),
            createUmumi(27, 'طیر', 'tayr'),
            createUmumi(28, 'جمع', 'jam'),
            createUmumi(29, 'عمد', 'amad'),
            createUmumi(30, 'عصر', 'asr'),

            createUmumi(31, 'خسر', 'khasr'),
            createUmumi(32, 'صبر', 'sabr'),
            createUmumi(33, 'سوف', 'sauf'),
            createUmumi(34, 'علم', 'ilm'),
            createUmumi(35, 'عین', 'ain'),

            createUmumi(36, 'کتاب', 'kitaab'),
            createUmumi(37, 'بینة', 'bayyinah'),
            createUmumi(38, 'قیمة', 'qeemah'),
            createUmumi(39, 'تفرق', 'tafarruq'),
            createUmumi(40, 'صلوة', 'salat'),

            createUmumi(41, 'زکوة', 'zakah'),
            createUmumi(42, 'تجری', 'tajri'),
            createUmumi(43, 'اعوذ', 'aoodhu'),
            createUmumi(44, 'نفثت', 'nafathat'),
            createUmumi(45, 'اعبد', 'aabud'),

            createUmumi(46, 'سیصلی', 'sayasla'),
            createUmumi(47, 'تضلیل', 'tadleel'),
            createUmumi(48, 'اعطینک', 'aatainak'),
            createUmumi(49, 'العلمین', 'aalameen'),
            createUmumi(50, 'نستعین', 'nastaeen'),

            createUmumi(51, 'مستقیم', 'mustaqeem'),
            createUmumi(52, 'مغضوب', 'maghdoob'),
            createUmumi(53, 'منفکین', 'munfakkeen'),
            createUmumi(54, 'للمصلین', 'lilmusalleen'),
            createUmumi(55, 'استغفر', 'astaghfir'),
        ],
    },
    {
        id: 'mashq-fil-asmaa',
        title: 'مشقی فی الاسماء',

        majmuaa: [],
        murakkabat: [],

        umumiMashq: [
            createUmumi(1, 'میاجی', 'munaji'),
            createUmumi(2, 'نور', 'noor'),
            createUmumi(3, 'محمد', 'muhammad'),
            createUmumi(4, 'صاحب', 'sahib'),

            createUmumi(5, 'حاجی', 'haji'),
            createUmumi(6, 'امداد', 'imdad'),
            createUmumi(7, 'الله', 'allah'),
            createUmumi(8, 'امام', 'imam'),

            createUmumi(9, 'مکی', 'makki'),
            createUmumi(10, 'رشيد', 'rashid'),
            createUmumi(11, 'شيخ', 'shaikh'),
            createUmumi(12, 'خليل', 'khaleel'),

            createUmumi(13, 'محدث', 'muhaddith'),
            createUmumi(14, 'زكريا', 'zakariya'),
            createUmumi(15, 'مرشد', 'murshid'),
            createUmumi(16, 'فقیه', 'faqeeh'),

            createUmumi(17, 'محمود', 'mahmood'),
            createUmumi(18, 'مفتی', 'mufti'),
            createUmumi(19, 'مفکر', 'mafakkir'),
            createUmumi(20, 'خانفوری', 'khanfuri'),

            createUmumi(21, 'احمد', 'ahmad'),
            createUmumi(22, 'امت', 'ummat'),
            createUmumi(23, 'محمود', 'hamood2'),
            createUmumi(24, 'مجدد', 'mujaddid'),

            createUmumi(25, 'حافظجی', 'hafizji'),
            createUmumi(26, 'مكاتب', 'makatib'),
            createUmumi(27, 'يوسف', 'yusuf'),
            createUmumi(28, 'كافودرا', 'kafordra'),

            createUmumi(29, 'اسمعيل', 'ismaeel'),
            createUmumi(30, 'صادق', 'sadiq'),
            createUmumi(31, 'ناصر', 'nasir'),
            createUmumi(32, 'صديق', 'siddiq'),

            createUmumi(33, 'الطاف', 'aljauf'),
            createUmumi(34, 'عزیز', 'aziz'),
            createUmumi(35, 'انور', 'anwar'),
            createUmumi(36, 'شکیل', 'shakeel'),

            createUmumi(37, 'سلیم', 'salim'),
            createUmumi(38, 'توصیف', 'tauseef'),
            createUmumi(39, 'بلال', 'bilal'),
            createUmumi(40, 'نورانی', 'noorani'),

            createUmumi(41, 'عمران', 'imran'),
            createUmumi(42, 'مكاتب', 'makatib'),
            createUmumi(43, 'بار دولی', 'bardoli'),
            createUmumi(44, 'دارال', 'daral'),

            createUmumi(45, 'سورت', 'surat'),
            createUmumi(46, 'فجرات', 'fujarat'),
            createUmumi(47, 'مكاتب', 'makatib'),
            createUmumi(48, 'الهند', 'alhind'),
        ],
    }

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
            timings: [0, 1000, 2000],
        },
        group: {
            text: group,
            audio: murakkabatAudio[group],
            timings: [0, 1000, 2000],
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
function createHamzahMajmuaa() {
    return {
        id: 1,

        isolated: {
            text: 'ء',
            audio: lettersAudio['hamzah'],
            timings: dummyTiming,
        },

        initial: {
            text: 'أ',
            audio: lettersAudio['hamzah'],
            timings: dummyTiming,
        },

        medial: {
            text: 'ؤ',
            audio: lettersAudio['hamzah'],
            timings: dummyTiming,
        },

        final: {
            text: 'ئ',
            audio: lettersAudio['hamzah'],
            timings: dummyTiming,
        },
    };
}
function createUmumi(
    id: number,
    text: string,
    audioKey: LetterAudioKey,
    timings: number[] = dummyTiming
) {
    return {
        id,
        base: { text, audio: lettersAudio[audioKey], timings: timings },
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
