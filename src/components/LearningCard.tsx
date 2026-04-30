import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MurakkabatAnimatedCard from "./MurakkabatAnimatedCard";
import TimedArabicWord from "./TimedArabicWord";

export default function LearningCard({
    sectionId,
    item,
    playId,
    isPlaying,
    playbackPositionMillis,
    playbackDurationMillis,
    onPlayWord,
}: any) {
    const isMajmuaaRow = !!item.isolated;
    const itemScope = `${sectionId}-${item.id}`;

    const columns = isMajmuaaRow
        ? ["isolated", "initial", "medial", "final"]
        : ["base", "initial", "medial", "final", "group"];

    /** 🔁 prevent multi-row overlap */
    const currentSequenceRef = React.useRef<number | null>(null);

    const playMajmuaaSequence = async (startIndex: number) => {
        const seqId = Date.now();
        currentSequenceRef.current = seqId;

        for (let i = startIndex; i < columns.length; i++) {
            if (currentSequenceRef.current !== seqId) return;

            const key = columns[i];
            const cell = item[key];
            if (!cell) continue;

            const wordId = `${itemScope}-${key}`;

            // ⭐ wait REAL audio finish
            await onPlayWord(wordId, cell.audio);
        }
    };

    return (
        <View
            style={[
                styles.row,
                isMajmuaaRow && playId?.startsWith(`${itemScope}-`) && styles.activeRow,
            ]}
        >
            {columns.map((key, index) => {
                const cell = item[key];
                if (!cell) return null;

                const wordId = `${itemScope}-${key}`;
                const isCurrent = playId === wordId;

                return (
                    <React.Fragment key={key}>
                        <MurakkabatAnimatedCard
                            isActive={isCurrent}
                            onPress={() =>
                                isMajmuaaRow
                                    ? playMajmuaaSequence(index)
                                    : onPlayWord(wordId, cell.audio)
                            }
                        >
                            <TimedArabicWord
                                id={wordId}
                                text={cell.text}
                                timings={cell.timings}
                                playId={isCurrent ? wordId : null}
                                isPlaying={isPlaying}
                                isMajmuaa={isMajmuaaRow}
                                playbackPositionMillis={playbackPositionMillis}
                                playbackDurationMillis={playbackDurationMillis}
                            />
                        </MurakkabatAnimatedCard>

                        {isMajmuaaRow &&
                            playId?.startsWith(`${itemScope}-`) &&
                            index < columns.length - 1 && (
                                <Text style={styles.arrow}>←</Text>
                            )}
                    </React.Fragment>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row-reverse",
        marginBottom: 10,
    },
    activeRow: {
        backgroundColor: "#F8FAFF",
        borderRadius: 14,
        paddingVertical: 6,
    },
    arrow: {
        alignSelf: "center",
        color: "#94A3B8",
        fontSize: 14,
        marginHorizontal: 2,
    },
});
