import React from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import HarkaatTabs from "../../components/ArabicComponents/HarkaatTabs";
import Screen from "../../components/Screen";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import { attachAudio } from "../../utils/attachAudio";
import { umumiLeen, waowLeen, yaaLeen } from "../../data/hurufeLeen";

const TABS = [
  {
    key: "umumiMashq",
    example: "بَوْ بَيْ",
    label: "عمومی مشق",
    color: "#9333EA",
    isCombined: true,
  },
  {
    key: "yaaLeen",
    example: "بَيْ",
    label: "یاے لین",
    color: "#047857",
  },
  {
    key: "waowLeen",
    example: "بَوْ",
    label: "واوِ لین",
    color: "#2563EB",
  },
];

const HurufeLeenMashq = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState("waowLeen");
  const fade = React.useRef(new Animated.Value(1)).current;
  const scrollRef = React.useRef<ScrollView>(null);

  const lessonMap = React.useMemo(
    () => ({
      yaaLeen: yaaLeen,
      waowLeen: waowLeen,
      umumiMashq: umumiLeen,
    }),
    []
  );

  const handleChange = (tab: string) => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });

    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setActiveTab(tab);
  };

  const current = lessonMap[activeTab as keyof typeof lessonMap];
  const hasData = current.some((section) => section.data.length > 0);

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
          size={38}
          color={theme.blue}
          style={styles.title}
        >
          حروفِ لین کی مشق
        </AppText>

        <HarkaatTabs active={activeTab} onChange={handleChange} tabs={TABS} />

        <Animated.View style={[styles.body, { opacity: fade }]}>
          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
            {hasData ? (
              current.map((section) => (
                <ArabicLesson
                  key={section.title}
                  title={section.title}
                  data={attachAudio(section.data)}
                />
              ))
            ) : (
              <View style={styles.emptyCard}>
                <AppText lang="ur" size={24} align="center" color={theme.blue}>
                  اس حصے کی مشق کا ڈیٹا ابھی شامل ہونا ہے۔
                </AppText>
                <AppText lang="ur" size={18} align="center" color={theme.subtitle} style={styles.emptyText}>
                  آپ الفاظ بھیج دیں، میں انہیں اسی اسکرین میں ترتیب دے دوں گا۔
                </AppText>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </Screen>
  );
};

export default HurufeLeenMashq;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 4,
  },
  body: {
    flex: 1,
  },
  emptyCard: {
    marginHorizontal: 16,
    marginTop: 28,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  emptyText: {
    marginTop: 10,
  },
});
