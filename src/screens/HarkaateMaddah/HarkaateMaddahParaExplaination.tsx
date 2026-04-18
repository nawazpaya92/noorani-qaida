import { StyleSheet, View } from "react-native";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import AppText from "../../components/AppText";
import RoundNumber from "../../components/RoundNumber";


export const harkaatemaddahExplanation = [
    "حرکات مدہ کے بیان میں چار امور ہیں:",
    "۱) حرکات اور حرکات مدہ کا فرق",
    "۲) حرکات مدہ اور حروف مدہ کا اعتبار",
    "۳) دونوں مثالیں (تقابلی طریقے سے)",
];


export default function HarkaateMaddahParaExplaination() {

    const navigation = useNavigation();
    const { theme } = useAppTheme();

    return (
        <View style={styles.lessonBox}>
            {harkaatemaddahExplanation.map((point, index) => (
                <View key={index}>

                    <View style={styles.pointRow}>

                        <AppText lang="ur" style={styles.pointText} size={24}>
                            {point}
                        </AppText>

                        <RoundNumber number={index + 1} style={{ marginLeft: 8 }} />
                    </View>

                    {index !== harkaatemaddahExplanation.length - 1 && (
                        <View style={styles.divider} />
                    )}

                </View>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({

    lessonBox: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,

        backgroundColor: "#F9FAFB",
        borderRadius: 16,

        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    pointRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    pointText: {
        flex: 1,
        textAlign: "right",
        fontSize: 24,
        lineHeight: 26,
        color: "#1F2937",
        fontFamily: "Noori",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
    },

})