import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import LessonFAQAccordion from "../../components/LessonFAQAccordion";
import Screen from "../../components/Screen";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import StartMashqButton from "../../components/StartMashqButton";

const ruleCards = [
  {
    id: "meaning",
    title: "تشدید کیا ہے؟",
    text: "تشدید والے حرف کو زور دے کر پڑھتے ہیں۔",
    example: "بّ",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    id: "joining",
    title: "کیسے بنتی ہے؟",
    text: "ایک ساکن حرف اپنے جیسے اگلے متحرک حرف میں مل جاتا ہے۔",
    example: "بْ + بَ = بَّ",
    color: "#047857",
    bg: "#D1FAE5",
  },
];

const tableGroups = [
  [
    { before: "رَبْبَ", after: "رَبَّ" },
    { before: "مُخْخٌ", after: "مُخٌّ" },
    { before: "كَلْلٌ", after: "كَلٌّ" },
    { before: "ضَالْلٌ", after: "ضَالٌّ" },
    { before: "مَنْنَ", after: "مَنَّ" },
    { before: "مَدْدَ", after: "مَدَّ" },
    { before: "شَرْرٌ", after: "شَرٌّ" },
    { before: "غُلْلٌ", after: "غُلٌّ" },
  ],
  [
    { before: "ضَلْلٌ", after: "ضَلٌّ" },
    { before: "غُمْمٌ", after: "غُمٌّ" },
    { before: "مَسْسٌ", after: "مَسٌّ" },
    { before: "كُفْفٌ", after: "كُفٌّ" },
    { before: "حُبْبًا", after: "حُبًّا" },
    { before: "حِلْلٌ", after: "حِلٌّ" },
    { before: "فَكْكٌ", after: "فَكٌّ" },
    { before: "جُبْبٌ", after: "جُبٌّ" },
  ],
];

const faqItems = [
  {
    id: "what",
    question: "مشدّد حرف کو کیسے پڑھیں گے؟",
    answer: "اس حرف کو زور دے کر پڑھیں گے۔",
  },
  {
    id: "why",
    question: "تشدید کیوں آتی ہے؟",
    answer: "کیونکہ ایک ہی جنس کے دو حرف مل کر ایک مشدّد حرف بن جاتے ہیں۔",
  },
  {
    id: "count",
    question: "کیا مشدّد حرف ایک حرف ہوتا ہے؟",
    answer: "لکھنے میں ایک نظر آتا ہے، مگر پڑھنے میں پہلے ساکن اور پھر متحرک کا اثر ہوتا ہے۔",
  },
];

const Tashdeed = () => {
  const navigation = useNavigation();
  const { theme } = useAppTheme();

  const onStartMashq = () => {
    navigation.push({ name: "TashdeedMashq" });
  };
  return (
    <Screen>
      <LinearGradient
        colors={theme.linearGradient as readonly [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AppHeader title="" onBack={navigation.pop} />

          <View style={styles.titleWrap}>
            <AppText variant="heading" lang="ur" size={36} align="center" color={theme.blue}>
              تشدید کا بیان
            </AppText>
            <AppText lang="ur" size={19} align="center" color={theme.subtitle} style={styles.subtitle}>
              مشدّد حرف کو مضبوطی اور زور کے ساتھ پڑھا جاتا ہے
            </AppText>
          </View>

          <View style={styles.ruleRow}>
            {ruleCards.map((item) => (
              <View key={item.id} style={[styles.ruleCard, { backgroundColor: item.bg }]}>
                <View style={[styles.exampleBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.badgeArabic}>{item.example}</Text>
                </View>
                <AppText lang="ur" variant="heading" size={22} align="center" color={item.color}>
                  {item.title}
                </AppText>
                <AppText lang="ur" size={16} align="center" color="#1F2937" style={styles.ruleText}>
                  {item.text}
                </AppText>
              </View>
            ))}
          </View>

          <View style={styles.noteBox}>
            <Ionicons name="information-circle" size={22} color={theme.blue} />
            <AppText lang="ur" size={18} color={theme.text} style={styles.noteText}>
              پہچان: جس حرف کے اوپر تشدید کی علامت ہو اسے مشدّد کہتے ہیں۔
            </AppText>
          </View>

          <View style={styles.section}>
            <AppText variant="heading" lang="ur" size={26} color={theme.blue} align="right">
              ادغام کی مثالیں
            </AppText>
            <AppText lang="ur" size={17} color={theme.subtitle} style={styles.sectionHint}>
              ادغام سے پہلے دو حرف الگ ہوتے ہیں، ادغام کے بعد ایک مشدّد حرف بن جاتا ہے۔
            </AppText>

            <View style={styles.tablesRow}>
              {tableGroups.map((group, groupIndex) => (
                <View key={String(groupIndex)} style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <HeaderCell text="ادغام کے بعد" />
                    <HeaderCell text="ادغام سے پہلے" />
                  </View>

                  {group.map((row) => (
                    <View key={`${row.before}-${row.after}`} style={styles.tableRow}>
                      <ArabicCell text={row.after} highlight />
                      <ArabicCell text={row.before} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          <LessonFAQAccordion
            items={faqItems}
            intro="بچوں سے پہلے ادغام سے پہلے والا لفظ پڑھوائیں، پھر ادغام کے بعد مشدّد صورت پڑھوائیں۔"
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

const HeaderCell = ({ text }: { text: string }) => (
  <View style={styles.cell}>
    <AppText lang="ur" size={15} align="center" color="#FFFFFF">
      {text}
    </AppText>
  </View>
);

const ArabicCell = ({ text, highlight }: { text: string; highlight?: boolean }) => (
  <View style={[styles.cell, highlight && styles.afterCell]}>
    <Text style={[styles.arabicCell, highlight && styles.afterText]}>{text}</Text>
  </View>
);

export default Tashdeed;

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
  ruleRow: {
    flexDirection: "row-reverse",
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
  ruleCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  exampleBadge: {
    minWidth: 76,
    minHeight: 76,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  badgeArabic: {
    fontFamily: "Quranic",
    fontSize: 34,
    lineHeight: 48,
    color: "#FFFFFF",
    textAlign: "center",
    writingDirection: "rtl",
  },
  ruleText: {
    minHeight: 78,
    marginTop: 4,
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
  sectionHint: {
    marginTop: 4,
  },
  tablesRow: {
    flexDirection: "row-reverse",
    gap: 10,
    marginTop: 12,
  },
  table: {
    flex: 1,
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
  cell: {
    flex: 1,
    minHeight: 58,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#DBEAFE",
  },
  afterCell: {
    backgroundColor: "#FDF2F8",
  },
  arabicCell: {
    fontFamily: "Quranic",
    fontSize: 27,
    lineHeight: 42,
    color: "#1D4ED8",
    textAlign: "center",
    writingDirection: "rtl",
  },
  afterText: {
    color: "#DB2777",
    fontSize: 30,
  },
  faqSection: {
    paddingHorizontal: 16,
  },
  mashqButtonWrap: {
    marginTop: 8,
    marginBottom: 10,
  },
});
