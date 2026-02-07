export const murakkabatAudio = {
    بط: require('../assets/audio/murakkabat/baa_taa.m4a'),
    طبو: require('../assets/audio/murakkabat/taa_baa_waow.m4a'),
    بظب: require('../assets/audio/murakkabat/baa_zoo_baa.m4a'),
    // 👉 you will keep adding here gradually
} as const;

export type MurakkabKey = keyof typeof murakkabatAudio;