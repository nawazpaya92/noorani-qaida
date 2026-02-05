export const majmuaaAndMurakkabat = [
    {
        id: 'ba-ta-sa',
        title: 'پہلا مجموعہ (ب ت ث ن ی)',
        majmuaa: [
            {
                id: 1,
                isolated: 'ب',
                initial: 'بـ',
                medial: 'ـبـ',
                final: 'ـب',
                audio: require('../assets/audio/letters/baa.m4a'),
            },
            {
                id: 2,
                isolated: 'ت',
                initial: 'تـ',
                medial: 'ـتـ',
                final: 'ـت',
                audio: require('../assets/audio/letters/taa.m4a'),
            },
            {
                id: 3,
                isolated: 'ث',
                initial: 'ثـ',
                medial: 'ـثـ',
                final: 'ـث',
                audio: require('../assets/audio/letters/saa.m4a'),
            },
            {
                id: 4,
                isolated: 'ن',
                initial: 'نـ',
                medial: 'ـنـ',
                final: 'ـن',
                audio: require('../assets/audio/letters/nun.m4a'),
            },
            {
                id: 5,
                isolated: 'ی',
                initial: 'یـ',
                medial: 'ـیـ',
                final: 'ـی',
                audio: require('../assets/audio/letters/yaa.m4a'),
            },
        ],

        // ✅ 5-column Murakkabat
        murakkabat: [
            {
                id: 1,
                base: 'ب',
                initial: 'بط',
                medial: 'طبو',
                final: 'بظب',
                group: 'ببب',
            },
            {
                id: 2,
                base: 'ت',
                initial: 'تز',
                medial: 'بتر',
                final: 'تظت',
                group: 'تتت',
            },
            {
                id: 3,
                base: 'ث',
                initial: 'ثو',
                medial: 'طثت',
                final: 'یث',
                group: 'ثثث',
            },
            {
                id: 4,
                base: 'ن',
                initial: 'نب',
                medial: 'بنت',
                final: 'طن',
                group: 'ننن',
            },
            {
                id: 5,
                base: 'ی',
                initial: 'ید',
                medial: 'طین',
                final: 'نی',
                group: 'ییی',
            }

        ],


    },
    {
        id: 'laam',
        title: 'دوسرا مجموعہ (ل)',
        majmuaa: [
            {
                id: 1,
                isolated: 'ل',
                initial: 'لـ',
                medial: 'ـلـ',
                final: 'ـل',
                audio: require('../assets/audio/letters/laam.m4a'),
            },

        ],

        // ✅ 5-column Murakkabat
        murakkabat: [
            {
                id: 1,
                base: 'ل',
                initial: 'لا',
                medial: 'لب',
                final: 'بل',
                group: 'للل',
            },
        ],
    },
    {
        id: 'geem-haa-khaa',
        title: 'تیسرا مجموعہ (ج ح خ)',
        majmuaa: [
            { id: 1, isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', audio: require('../assets/audio/letters/jeem.m4a') },
            { id: 2, isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', audio: require('../assets/audio/letters/haa.m4a') },
            { id: 3, isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', audio: require('../assets/audio/letters/khaa.m4a') },
        ],

        // ✅ 5-column Murakkabat
        murakkabat: [
            { id: 1, base: 'ج', initial: 'جب', medial: 'تخن', final: 'تج', group: 'ججج' },
            { id: 2, base: 'ح', initial: 'حل', medial: 'بحر', final: 'تح', group: 'ححح' },
            { id: 3, base: 'خ', initial: 'خل', medial: 'تجل', final: 'تخ', group: 'خخخ' },

        ],


    },
    {

        id: 'seen-shin',
        title: 'چوتھا مجموعہ (س ش)',
        majmuaa: [
            { id: 1, isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', audio: require('../assets/audio/letters/seen.m4a') },
            { id: 2, isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', audio: require('../assets/audio/letters/sheen.m4a') },
        ],

        // ✅ 5-column Murakkabat
        murakkabat: [
            { id: 1, base: 'س', initial: 'سر', medial: 'لست', final: 'نس', group: 'سسسس' },
            { id: 2, base: 'ش', initial: 'شط', medial: 'بشر', final: 'تش', group: 'شششش' },
        ],

    },
    {

        id: 'swaad-duwaad',
        title: 'پانچواں مجموعہ (ص ض)',
        majmuaa: [
            { id: 1, isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', audio: require('../assets/audio/letters/swaad.m4a') },
            { id: 2, isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', audio: require('../assets/audio/letters/dwaad.m4a') },
        ],

        // ✅ 5-column Murakkabat
        murakkabat: [
            { id: 1, base: 'ص', initial: 'صل', medial: 'نصب', final: 'نص', group: 'صصص' },
            { id: 2, base: 'ض', initial: 'ضر', medial: 'يضل', final: 'لض', group: 'ضضض' },
        ],

    },
    {

        id: 'aeen-gwaeen',
        title: 'چھٹا مجموعہ (ع غ)',
        majmuaa: [
            { id: 1, isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', audio: require('../assets/audio/letters/aeen.m4a') },
            { id: 2, isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', audio: require('../assets/audio/letters/gwaeen.m4a') },],

        // ✅ 5-column Murakkabat
        murakkabat: [
            { id: 1, base: 'ع', initial: 'عن', medial: 'بعد', final: 'لع', group: 'ععع' },
            { id: 2, base: 'غ', initial: 'غض', medial: 'لغد', final: 'صغ', group: 'غغغ' },
        ],

    },
    {

        id: 'faa-qaaf',
        title: 'ساتواں مجموعہ (ف ق)',
        majmuaa: [
            { id: 1, isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', audio: require('../assets/audio/letters/faa.m4a') },
            { id: 2, isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', audio: require('../assets/audio/letters/qaaf.m4a') },
        ],
        // ✅ 5-column Murakkabat
        murakkabat: [
            { id: 1, base: 'ف', initial: 'فظ', medial: 'خفت', final: 'صف', group: 'فقف' },
            { id: 2, base: 'ق', initial: 'قل', medial: 'نقص', final: 'حق', group: 'ققق' },
        ],

    },
    {

        id: 'kaaf',
        title: 'آٹھواں مجموعہ (ک م ہ)',
        majmuaa: [
            { id: 1, isolated: 'ک', initial: 'کـ', medial: 'ـکـ', final: 'ـک', audio: require('../assets/audio/letters/kaaf.m4a') },
            { id: 2, isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', audio: require('../assets/audio/letters/meem.m4a') },
            { id: 3, isolated: 'ہ', initial: 'ہـ', medial: 'ـہـ', final: 'ـہ', audio: require('../assets/audio/letters/s_haa.m4a') },
        ],
        // ✅ 5-column Murakkabat
        murakkabat: [
            { id: 1, base: 'ک', initial: 'کن', medial: 'لکن', final: 'نک', group: 'ککک' },
            { id: 2, base: 'م', initial: 'من', medial: 'لمن', final: 'ہم', group: 'ممم' },
            { id: 3, base: 'ہ', initial: 'ہن', medial: 'جہن', final: 'بہ', group: 'ہہہ' },
        ],

    },
];
