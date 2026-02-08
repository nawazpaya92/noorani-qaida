import { useEffect, useRef, useState } from "react";

export function useTimedHighlightTest(
    playId: number,
    timings: number[]
) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const timers = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        if (playId === 0) return;

        // clear old timers
        timers.current.forEach(clearTimeout);
        timers.current = [];

        setActiveIndex(null);

        timings.forEach((time, index) => {
            const t = setTimeout(() => setActiveIndex(index), time);
            timers.current.push(t);
        });

        const end = setTimeout(() => {
            setActiveIndex(null);
        }, timings[timings.length - 1] + 400);

        timers.current.push(end);

        return () => {
            timers.current.forEach(clearTimeout);
        };
    }, [playId]);

    return activeIndex;
}
