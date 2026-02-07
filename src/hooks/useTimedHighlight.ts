import { useEffect, useRef, useState } from "react";

export function useTimedHighlight(
    playId: string | null,
    timings: number[],
    isPlaying: boolean
) {
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        // 🔥 ALWAYS clear previous timers
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        // 🔥 If not active → reset immediately
        if (!playId || !isPlaying) {
            setActiveIndex(-1);
            return;
        }

        // 🔥 Start fresh timers
        timings.forEach((time, index) => {
            const t = setTimeout(() => {
                setActiveIndex(index);
            }, time);

            timersRef.current.push(t);
        });

        // 🔥 Cleanup on playId change OR unmount
        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
            setActiveIndex(-1); // ⭐ THIS was missing in most buggy versions
        };
    }, [playId, timings, isPlaying]);

    return activeIndex;
}
