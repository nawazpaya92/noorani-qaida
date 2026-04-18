// src/data/madd/maddQuizData.ts

export type MaddType = "alif" | "waw" | "yaa";
export const MADD_OPTIONS: MaddType[] = ["alif", "waw", "yaa"];


export type MaddQuizItem = {
    id: string;
    text: string;            // ✅ unified key
    correct: MaddType[];     // ✅ multi-select support
};

export const maddQuizData: MaddQuizItem[] = [
    {
        id: "madd_waw_yakeedoona",
        text: "يَكِيدُونَ",
        correct: ["waw"],
    },
    {
        id: "madd_alif_yahyaa",
        text: "يَحْيَا",
        correct: ["alif"],
    },
    {
        id: "madd_yaa_alif_nujjeenaa",
        text: "نُجِّيْنَا",
        correct: ["yaa", "alif"],
    },
    {
        id: "madd_alif_yaa_asaateeru",
        text: "أَسَاطِيرُ",
        correct: ["alif", "yaa"],
    },
    {
        id: "madd_waw_yaa_alif_ootinaa",
        text: "أُوتِينَا",
        correct: ["waw", "yaa", "alif"],
    },
    {
        id: "madd_yaa_alif_ayyadnaa",
        text: "أَيَّدْنَا",
        correct: ["yaa", "alif"],
    },
    {
        id: "madd_alif_waw_tadaaowna",
        text: "تَدَاعَوْنَ",
        correct: ["alif", "waw"],
    },
    {
        id: "madd_yaa_waw_aytoonee",
        text: "اَيْتُونِي",
        correct: ["yaa", "waw"],
    },
    {
        id: "madd_alif_yaa_waw_fala_tameeloo",
        text: "فَلَا تَمِيلُوا",
        correct: ["alif", "yaa", "waw"],
    },
    {
        id: "madd_waw_yaa_alif_oozeenaa",
        text: "أُوذِينَا",
        correct: ["waw", "yaa", "alif"],
    },
];