import { lettersAudio } from "../components/lettersAudio";

type LessonItem = {
    id: string;
    text: string;
};


function generateTimings(text: string) {
    const step = 350; // milliseconds between letters
    const letters = text.length;

    return Array.from({ length: letters }, (_, i) => i * step);
}
export function attachAudio(data: LessonItem[]) {
    return data.map((item) => ({
        ...item,
        audio: lettersAudio[item.id as keyof typeof lettersAudio],
        timings: generateTimings(item.text),
    }));
}