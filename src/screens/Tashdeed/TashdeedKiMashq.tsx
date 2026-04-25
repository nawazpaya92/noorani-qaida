import React from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import Screen from "../../components/Screen";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import { attachAudio } from "../../utils/attachAudio";
import {
  tashdeedMashqSections,
  type TashdeedMashqSection,
} from "../../data/tashdeed";

const TashdeedKiMashq = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const scrollRef = React.useRef<ScrollView>(null);
  const [openId, setOpenId] = React.useState<string | undefined>(
    tashdeedMashqSections[0]?.id
  );

  const handleToggle = (sectionId: string) => {
    setOpenId((current) => {
      const next = current === sectionId ? undefined : sectionId;

      if (next) {
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ y: 0, animated: true });
        });
      }

      return next;
    });
  };

  return (
    <Screen>
      <LinearGradient
        colors={theme.linearGradient as readonly [string, string]}
        style={styles.screen}
      >
        <AppHeader title="" onBack={navigation.pop} />

        <AppText
          variant="heading"
          lang="ur"
          align="center"
          size={36}
          color={theme.blue}
          style={styles.title}
        >
          تشدید کی مشق
        </AppText>

        <AppText
          lang="ur"
          align="center"
          size={18}
          color={theme.subtitle}
          style={styles.subtitle}
        >
          ہر حصّہ الگ کھولیں، پڑھیں، پھر اگلے حصّے پر جائیں
        </AppText>

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.introCard}>
            <Ionicons name="bulb-outline" size={20} color="#1D4ED8" />
            <AppText lang="ur" size={17} color={theme.text} style={styles.introText}>
              اسکرین کو چھوٹا اور آسان رکھنے کے لئے ہر مشق الگ کھلتی ہے۔ جس حصّے کی
              مشق کرنی ہو، صرف وہی کھولیں۔
            </AppText>
          </View>

          {tashdeedMashqSections.map((section, index) => {
            const open = openId === section.id;

            return (
              <MashqAccordionItem
                key={section.id}
                section={section}
                index={index}
                open={open}
                onToggle={() => handleToggle(section.id)}
              />
            );
          })}
        </ScrollView>
      </LinearGradient>
    </Screen>
  );
};

const MashqAccordionItem = ({
  section,
  index,
  open,
  onToggle,
}: {
  section: TashdeedMashqSection;
  index: number;
  open: boolean;
  onToggle: () => void;
}) => {
  return (
    <View style={styles.sectionWrap}>
      <Pressable onPress={onToggle} style={styles.sectionPressable}>
        <LinearGradient
          colors={open ? ["#DBEAFE", "#BFDBFE"] : ["#FFFFFF", "#EFF6FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sectionHeader}
        >
          <View style={[styles.numberBadge, open && styles.numberBadgeOpen]}>
            <Text style={[styles.numberText, open && styles.numberTextOpen]}>
              {index + 1}
            </Text>
          </View>

          <View style={styles.headerTextWrap}>
            <AppText lang="ur" size={22} color="#0F172A" style={styles.sectionTitle}>
              {section.title}
            </AppText>
            {section.subtitle ? (
              <AppText lang="ur" size={15} color="#475569">
                {section.subtitle}
              </AppText>
            ) : null}
          </View>

          <Text style={styles.chevron}>{open ? "−" : "+"}</Text>
        </LinearGradient>
      </Pressable>

      {open ? (
        <View style={styles.sectionBody}>
          {section.teacherNote ? (
            <View style={styles.noteCard}>
              <Ionicons name="school-outline" size={18} color="#DB2777" />
              <AppText lang="ur" size={17} color="#1E3A8A" style={styles.noteText}>
                {section.teacherNote}
              </AppText>
            </View>
          ) : null}

          {section.explanationTitle || section.explanationText ? (
            <View style={styles.explanationCard}>
              {section.explanationTitle ? (
                <AppText
                  lang="ur"
                  size={23}
                  color="#DB2777"
                  align="center"
                  style={styles.explanationTitle}
                >
                  {section.explanationTitle}
                </AppText>
              ) : null}
              {section.explanationText ? (
                <AppText lang="ur" size={18} color="#1E3A8A" style={styles.explanationText}>
                  {section.explanationText}
                </AppText>
              ) : null}
            </View>
          ) : null}

          {section.comparisonRows?.length ? (
            <View style={styles.comparisonTable}>
              <View style={[styles.comparisonRow, styles.comparisonHeaderRow]}>
                <ComparisonHeader text="ادغام کے بعد" />
                <ComparisonHeader text="ادغام سے پہلے" />
                <ComparisonHeader text="ادغام کے بعد" />
                <ComparisonHeader text="ادغام سے پہلے" />
              </View>
              {section.comparisonRows.map((row) => (
                <View
                  key={`${row.beforeOne}-${row.afterOne}-${row.beforeTwo}-${row.afterTwo}`}
                  style={styles.comparisonRow}
                >
                  <ComparisonCell text={row.afterOne} highlight />
                  <ComparisonCell text={row.beforeOne} />
                  <ComparisonCell text={row.afterTwo} highlight />
                  <ComparisonCell text={row.beforeTwo} />
                </View>
              ))}
            </View>
          ) : null}

          {section.data.length > 0 ? (
            <ArabicLesson title="" data={attachAudio(section.data)} />
          ) : (
            <View style={styles.placeholderCard}>
              <AppText lang="ur" size={18} color="#1D4ED8" align="center">
                اس حصّے کا لفظی ڈیٹا ابھی شامل ہونا ہے۔
              </AppText>
              <AppText
                lang="ur"
                size={16}
                color="#64748B"
                align="center"
                style={styles.placeholderText}
              >
                آپ جدول کا متن بھیج دیں، میں اسی حصّے میں فوراً بھر دوں گا۔
              </AppText>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

const ComparisonHeader = ({ text }: { text: string }) => (
  <View style={styles.comparisonCell}>
    <AppText lang="ur" size={14} align="center" color="#FFFFFF">
      {text}
    </AppText>
  </View>
);

const ComparisonCell = ({ text, highlight }: { text: string; highlight?: boolean }) => (
  <View style={[styles.comparisonCell, highlight && styles.comparisonAfterCell]}>
    <Text style={[styles.comparisonArabic, highlight && styles.comparisonAfterText]}>
      {text}
    </Text>
  </View>
);

export default TashdeedKiMashq;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    marginHorizontal: 16,
  },
  subtitle: {
    marginTop: 2,
    marginBottom: 10,
    marginHorizontal: 18,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  introCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 14,
  },
  introText: {
    flex: 1,
    marginRight: 8,
  },
  sectionWrap: {
    marginBottom: 12,
  },
  sectionPressable: {
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D6E6FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  numberBadgeOpen: {
    backgroundColor: "#1D4ED8",
  },
  numberText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  numberTextOpen: {
    color: "#FFFFFF",
  },
  headerTextWrap: {
    flex: 1,
  },
  sectionTitle: {
    lineHeight: 30,
  },
  chevron: {
    width: 26,
    textAlign: "center",
    fontSize: 24,
    color: "#1D4ED8",
    marginRight: 8,
  },
  sectionBody: {
    marginTop: 10,
  },
  noteCard: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    backgroundColor: "#FFF1F7",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FBCFE8",
    marginBottom: 6,
  },
  noteText: {
    flex: 1,
    marginRight: 8,
    lineHeight: 28,
  },
  explanationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FBCFE8",
    marginBottom: 10,
  },
  explanationTitle: {
    marginBottom: 6,
  },
  explanationText: {
    lineHeight: 30,
  },
  comparisonTable: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D6E6FF",
    marginBottom: 8,
  },
  comparisonRow: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#DBEAFE",
  },
  comparisonHeaderRow: {
    backgroundColor: "#2563EB",
  },
  comparisonCell: {
    flex: 1,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#DBEAFE",
  },
  comparisonAfterCell: {
    backgroundColor: "#FDF2F8",
  },
  comparisonArabic: {
    fontFamily: "Quranic",
    fontSize: 22,
    lineHeight: 34,
    textAlign: "center",
    writingDirection: "rtl",
    color: "#1D4ED8",
  },
  comparisonAfterText: {
    color: "#DB2777",
  },
  placeholderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginHorizontal: 12,
    marginTop: 8,
  },
  placeholderText: {
    marginTop: 8,
  },
});
