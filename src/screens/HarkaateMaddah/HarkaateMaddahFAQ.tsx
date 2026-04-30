import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import { faqData } from "../../data/harkaateMaddah/faqData";
import LessonFAQAccordion from "../../components/LessonFAQAccordion";


const HarkaateMaddahFAQ = () => {
    const StatementBlock = ({ data }: any) => (
        <View style={styles.statementCard}>
            {data.map((item: any, i: number) => (
                <AppText key={i} lang="ur" style={styles.statementText}>

                    {/* Highlight Part */}
                    <AppText style={styles.highlight} size={30} lang="ar">
                        {item.title}{" "}
                    </AppText>

                    {/* Normal Part */}
                    <AppText style={styles.normal} size={24}>
                        {item.text}
                    </AppText>

                </AppText>
            ))}
        </View>
    );
    const NoteBlock = ({ text }: any) => (
        <View style={styles.noteBox}>
            <AppText lang="ur" size={17}>
                نوٹ: {text}
            </AppText>
        </View>
    );
    return (
        <View style={styles.wrapper}>
            <StatementBlock data={faqData.statements} />
            <LessonFAQAccordion
                items={faqData.questions}
                intro={faqData.intro}
                style={styles.faqSection}
            />
            <NoteBlock text={faqData.note} />
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 16,
        paddingBottom: 40,
    },
    faqSection: {
        marginTop: 0,
        paddingHorizontal: 16,
    },
    noteBox: {
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,

        borderRadius: 18,
        backgroundColor: "#F1F8F4",

        borderLeftWidth: 5,
        borderLeftColor: "#2E7D32",

        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    statementCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,

        backgroundColor: "#FFFFFF",
        borderRadius: 18,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    statementText: {
        fontSize: 20,          // 🔥 bigger
        lineHeight: 34,
        marginBottom: 10,
    },

    highlight: {
        color: "#D81B60",      // 🔥 pink like screenshot

    },

    normal: {
        color: "#1E3A8A",      // deep blue
    },



});
export default HarkaateMaddahFAQ;
