import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import { useAppTheme } from "../../theme/ThemeContext";

type Row = {
    right: string; // e.g. "با"
    left: string;  // e.g. "بَ"
};

type Props = {
    data: Row[];
    title?: string;
    titleSize?: number;
};

const HarkaateMaddahComparison = ({ data, title, titleSize = 18 }: Props) => {
    const { theme } = useAppTheme();
    return (
        <View style={styles.wrapper}>

            {/* Optional Title */}


            {/* Table Card */}
            <View style={styles.card}>
                {title && (
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                        <AppText
                            variant="heading"
                            lang="ur"
                            size={titleSize}

                            align="center"
                            style={{
                                marginBottom: 10,
                                backgroundColor: theme.lightBlue,
                                borderRadius: 10,
                                paddingHorizontal: 14,
                            }}
                            color={theme.text}

                        >
                            {title}
                        </AppText>
                    </View>
                )}

                {/* Header */}
                <View style={[styles.headerRow, { backgroundColor: theme.bgSoft }]}>
                    <AppText style={styles.headerCell} lang="ur" size={20}>
                        حروف مدہ
                    </AppText>
                    <AppText style={styles.headerCell} lang="ur" size={20}>
                        حرکات
                    </AppText>
                </View>

                {/* Rows */}
                {data.map((row, index) => (
                    <View
                        key={index}
                        style={[
                            styles.row,
                            index !== data.length - 1 && styles.rowDivider,
                        ]}
                    >
                        {/* Right Column (Madd) */}
                        <View style={styles.cell}>
                            <AppText lang="ar" size={28}>
                                {row.left}
                            </AppText>
                        </View>

                        {/* Equal Symbol */}
                        <View style={styles.equalCell}>
                            <AppText style={styles.equalText}>
                                ≈
                            </AppText>
                        </View>

                        {/* Left (Harkat) */}
                        <View style={styles.cell}>
                            <AppText lang="ar" size={28}>
                                {row.right}
                            </AppText>
                        </View>

                    </View>
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginTop: 16,
    },

    title: {
        marginBottom: 10,
    },
    equalCell: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    equalText: {
        fontSize: 20,
        color: "#1ab12cff",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 8,

        // shadow
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },

    headerRow: {
        flexDirection: "row-reverse",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#EEF2F1",

    },

    headerCell: {
        flex: 1,
        textAlign: "center",
        color: "#1B5E20",
    },

    row: {
        flexDirection: "row-reverse",
        paddingVertical: 14,
        alignItems: "center",
    },

    rowDivider: {
        borderBottomWidth: 1,
        borderColor: "#F1F5F4",
    },

    cell: {
        flex: 1,
        alignItems: "center",
    },

});
export default HarkaateMaddahComparison;
