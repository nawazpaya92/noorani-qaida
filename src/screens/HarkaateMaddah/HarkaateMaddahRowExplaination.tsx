
import { StyleSheet, View } from "react-native";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import AppText from "../../components/AppText";

export const harkaatExamples = [
    { id: "baa_with_zabar", text: "بَ" },
    { id: "baa_with_khada_zabar", text: "بٰ" },
    { id: "baa_with_zer", text: "بِ" },
    { id: "baa_with_kadi_zer", text: "بٖ" },
    { id: "baa_with_pesh", text: "بُ" },
    { id: "baa_with_ulta_pesh", text: "بٗ" },
];


const grouped = [
    harkaatExamples.slice(0, 2),
    harkaatExamples.slice(2, 4),
    harkaatExamples.slice(4, 6),
];

export default function HarkaateMaddahRowExplaination() {

    const navigation = useNavigation();
    const { theme } = useAppTheme();

    return (
        <>
            <View style={styles.card}>

                <View style={{ alignItems: 'center', marginTop: 12 }}>
                    <AppText variant="heading" lang="ur" size={20} align="center" style={{
                        marginBottom: 10,
                        backgroundColor: theme.lightBlue,
                        borderRadius: 10,
                        paddingHorizontal: 14,
                    }}
                        color={theme.text}>
                        حرکات کی مثال
                    </AppText>
                </View>
                <View style={styles.container}>
                    {grouped.map((group, index) => (
                        <View key={index} style={styles.group}>
                            {group.map((item, i) => (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.item,
                                        i !== group.length - 1 && styles.divider,
                                    ]}
                                >
                                    <AppText lang="ar" size={30}>
                                        {item.text}
                                    </AppText>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </>

    )
}
const styles = StyleSheet.create({

    container: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    divider: {
        borderRightWidth: 1,
        borderColor: "#E5E7EB",
    },
    card: {
        margin: 16,
        paddingVertical: 16,
        paddingHorizontal: 10,

        backgroundColor: "#FFFFFF",
        borderRadius: 20,

        // soft shadow
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },

    group: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#F8FAF9",
        borderRadius: 14,

        paddingVertical: 8,
        paddingHorizontal: 10,

        borderWidth: 1,
        borderColor: "#EEF2F1",

        marginHorizontal: 4,
    },

    item: {
        paddingHorizontal: 10,
        alignItems: "center",
    },

})