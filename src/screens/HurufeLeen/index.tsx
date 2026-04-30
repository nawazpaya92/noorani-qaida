import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import LessonFAQAccordion from "../../components/LessonFAQAccordion";
import StartMashqButton from "../../components/StartMashqButton";

const leenTypes = [
  {
    id: "waow",
    title: "واوِ لین",
    letter: "وْ",
    rule: "جس واو ساکن سے پہلے زبر ہو اسے واوِ لین کہتے ہیں۔",
    example: "خَوْف",
    color: "#1D4ED8",
    bg: "#DBEAFE",
  },
  {
    id: "yaa",
    title: "یاے لین",
    letter: "یْ",
    rule: "جس یا ساکن سے پہلے زبر ہو اسے یاے لین کہتے ہیں۔",
    example: "بَيْت",
    color: "#047857",
    bg: "#D1FAE5",
  },
];

const comparisonRows = [
  { id: "waow", maddah: "بُو", leen: "بَوْ", wrong: "بْو" },
  { id: "yaa", maddah: "بِی", leen: "بَيْ", wrong: "بْی" },
];

const faqItems = [
  {
    id: "what-waow",
    question: "یہ کیا ہوگا؟",
    answer: "واوِ لین ہوگا۔",
  },
  {
    id: "why-waow",
    question: "واوِ لین کیوں ہوگا؟",
    answer: "کیونکہ واو ساکن ہے اور اس سے پہلے زبر ہے۔",
  },
  {
    id: "what-yaa",
    question: "یہ کیا ہوگا؟",
    answer: "یاے لین ہوگا۔",
  },
  {
    id: "why-yaa",
    question: "یاے لین کیوں ہوگا؟",
    answer: "کیونکہ یا ساکن ہے اور اس سے پہلے زبر ہے۔",
  },
  {
    id: "how-read",
    question: "حروفِ لین کو کیسے پڑھیں گے؟",
    answer: "نرمی کے ساتھ جلدی سے پڑھیں گے، مد کی طرح لمبا نہیں کھینچیں گے۔",
  },
];

const HurufeLeen = () => {
  const navigation = useNavigation();
  const { theme } = useAppTheme();

  const onStartMashq = () => {
    navigation.push({ name: "HurufeLeenMashq" });
  };

  return (
    <Screen>
      <LinearGradient
        colors={theme.linearGradient as readonly [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <AppHeader title="" onBack={navigation.pop} />

          <View style={styles.titleWrap}>
            <AppText
              variant="heading"
              lang="ur"
              size={36}
              align="center"
              color={theme.blue}
            >
              حروفِ لین کا بیان
            </AppText>
            <AppText
              lang="ur"
              size={20}
              align="center"
              color={theme.subtitle}
              style={styles.subtitle}
            >
              حروفِ لین دو ہیں: واوِ لین اور یاے لین
            </AppText>
          </View>

          <View style={styles.typesRow}>
            {leenTypes.map((item) => (
              <View key={item.id} style={[styles.typeCard, { backgroundColor: item.bg }]}>
                <View style={[styles.letterBadge, { backgroundColor: item.color }]}>
                  <AppText lang="ar" size={44} align="center" color="#FFFFFF">
                    {item.letter}
                  </AppText>
                </View>
                <AppText
                  lang="ur"
                  variant="heading"
                  size={23}
                  align="center"
                  color={item.color}
                >
                  {item.title}
                </AppText>
                <AppText lang="ur" size={16} align="center" color="#1F2937" style={styles.ruleText}>
                  {item.rule}
                </AppText>
                <View style={styles.examplePill}>
                  <AppText lang="ar" size={30} align="center" color={item.color}>
                    {item.example}
                  </AppText>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.noteBox}>
            <Ionicons name="information-circle" size={22} color={theme.blue} />
            <AppText lang="ur" size={18} color={theme.text} style={styles.noteText}>
              پہچان: پہلے حرف پر زبر ہوگی، اس کے بعد واو یا یا ساکن آئے گا۔
            </AppText>
          </View>

          <View style={styles.section}>
            <AppText variant="heading" lang="ur" size={26} color={theme.blue} align="right">
              قاعدہ ٹیبل
            </AppText>

            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <HeaderCell text="حروف مدہ" />
                <HeaderCell text="حروف لین" highlight />
                <HeaderCell text="✕" wrong />
              </View>

              {comparisonRows.map((row) => (
                <View key={row.id} style={styles.tableRow}>
                  <ArabicCell text={row.maddah} />
                  <ArabicCell text={row.leen} highlight />
                  <ArabicCell text={row.wrong} wrong />
                </View>
              ))}
            </View>

            <AppText lang="ur" size={17} color={theme.subtitle} style={styles.tableHint}>
              غلط خانے والی صورت کہیں نہیں آتی۔ حروفِ لین میں پہلے حرف پر زبر، پھر واو یا یا ساکن آتا ہے۔
            </AppText>
          </View>

          <LessonFAQAccordion
            items={faqItems}
            intro="بچوں سے اسی انداز میں سوال کریں، تاکہ قاعدہ ذہن میں اچھی طرح بیٹھ جائے۔"
            style={styles.faqSection}
          />

          <View style={styles.mashqButtonWrap}>
            <StartMashqButton title="مشق شروع کریں" onPress={onStartMashq} />
          </View>
        </ScrollView>
      </LinearGradient>
    </Screen>
  );
};

const HeaderCell = ({
  text,
  highlight,
  wrong,
}: {
  text: string;
  highlight?: boolean;
  wrong?: boolean;
}) => (
  <View style={[styles.cell, highlight && styles.highlightHeaderCell, wrong && styles.wrongHeaderCell]}>
    <AppText lang="ur" size={20} align="center" color={wrong ? "#DC2626" : "#FFFFFF"}>
      {text}
    </AppText>
  </View>
);

const ArabicCell = ({
  text,
  highlight,
  wrong,
}: {
  text: string;
  highlight?: boolean;
  wrong?: boolean;
}) => (
  <View style={[styles.cell, highlight && styles.highlightCell, wrong && styles.wrongCell]}>
    <Text style={[styles.arabicCell, highlight && styles.highlightCellText, wrong && styles.wrongCellText]}>
      {text}
    </Text>
  </View>
);

export default HurufeLeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 34,
  },
  titleWrap: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 10,
  },
  subtitle: {
    marginTop: 2,
  },
  typesRow: {
    flexDirection: "row-reverse",
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
  typeCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  letterBadge: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  ruleText: {
    minHeight: 76,
    marginTop: 4,
  },
  examplePill: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  noteBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E7FF",
  },
  noteText: {
    flex: 1,
    marginRight: 8,
  },
  section: {
    marginTop: 22,
    paddingHorizontal: 16,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  tableRow: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#DBEAFE",
  },
  tableHeader: {
    backgroundColor: "#2563EB",
  },
  highlightHeaderCell: {
    backgroundColor: "#2563EB",
    borderLeftColor: "#1E40AF",
  },
  wrongHeaderCell: {
    backgroundColor: "#FEE2E2",
  },
  cell: {
    flex: 1,
    minHeight: 70,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#DBEAFE",
  },
  highlightCell: {
    backgroundColor: "#E0F2FE",
    borderLeftColor: "#38BDF8",
  },
  wrongCell: {
    backgroundColor: "#FEF2F2",
  },
  arabicCell: {
    fontFamily: "Quranic",
    fontSize: 34,
    lineHeight: 52,
    writingDirection: "rtl",
    textAlign: "center",
    color: "#111827",
  },
  highlightCellText: {
    color: "#075985",
    fontSize: 38,
  },
  wrongCellText: {
    color: "#DC2626",
  },
  tableHint: {
    marginTop: 10,
  },
  faqSection: {
    paddingHorizontal: 16,
  },
  mashqButtonWrap: {
    marginTop: 8,
    marginBottom: 10,
  },
});
