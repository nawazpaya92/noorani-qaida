import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MajmuaaTile from "./MajmuaaTile";

export default function MajmuaaRow({ item, activeCell, setActiveCell }: any) {
    const forms = ["isolated", "initial", "medial", "final"] as const;

    const isRowActive = activeCell?.rowId === item.id;

    return (
        <View style={[styles.row, isRowActive && styles.activeRow]}>
            {forms.map((form, i) => (
                <React.Fragment key={form}>
                    <MajmuaaTile
                        letter={item[form]}
                        audio={item.audio}
                        active={isRowActive && activeCell.form === form}
                        onActivate={() => setActiveCell({ rowId: item.id, form })}
                        onDeactivate={() => setActiveCell(null)}
                    />

                    {isRowActive && i < forms.length - 1 && (
                        <Text style={styles.arrow}>←</Text>
                    )}
                </React.Fragment>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row-reverse",
    },
    activeRow: {
        backgroundColor: "#EEF5FF",
        borderRadius: 16,
    },
    arrow: {
        alignSelf: "center",
        color: "#94A3B8",
        fontSize: 14,
        marginHorizontal: 2,
    },
});
