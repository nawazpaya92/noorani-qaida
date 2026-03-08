import { useRef, useState } from "react";
import { Audio } from "expo-av";

export function useArabicAudio() {
    const soundRef = useRef<Audio.Sound | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const stop = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
        }
        setIsPlaying(false);
        setActiveId(null);
    };

    const play = async (id: string, source: any) => {
        // stop previous
        await stop();

        const { sound } = await Audio.Sound.createAsync(source);
        soundRef.current = sound;

        setActiveId(id);
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
            if (!status.isLoaded) return;

            if (status.didJustFinish) {
                stop();
            }
        });

        await sound.playAsync();
    };

    return {
        play,
        stop,
        activeId,
        isPlaying,
    };
}
