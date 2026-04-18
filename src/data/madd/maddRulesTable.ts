export const maddTableHeaders = [
    "مثال",
    "مد ہوگا یا نہیں",
    "پہلی علامت",
    "دوسری علامت",
    "الف مدہ بنانا ہو تو",
];

export const maddData = [
    {
        id: "alif",
        letter: "ا",
        sound: 'Makes "aa" sound',
        example: "قَالَ",
        colors: ["#43A047", "#66BB6A"],
    },
    {
        id: "waw",
        letter: "و",
        sound: 'Makes "oo" sound',
        example: "يَقُولُ",
        colors: ["#1E88E5", "#42A5F5"],
    },
    {
        id: "ya",
        letter: "ي",
        sound: 'Makes "ee" sound',
        example: "قِيلَ",
        colors: ["#8E24AA", "#AB47BC"],
    },
];
export const maddTableData = [
    {
        id: "1",
        example: "بَاَ",
        madd: false,
        firstSign: true,
        secondSign: false,
        rule: "الف پر سے زبر ہٹا دو",
    },
    {
        id: "2",
        example: "بَّا",
        madd: false,
        firstSign: false,
        secondSign: true,
        rule: "ایک زبر ہٹا دو",
    },
    {
        id: "3",
        example: "بَاْ",
        madd: false,
        firstSign: true,
        secondSign: false,
        rule: "الف پر سے جزم ہٹا دو",
    },
    {
        id: "4",
        example: "بَا",
        madd: true,
        firstSign: true,
        secondSign: true,
        rule: "مد ہوگا",
    },
];