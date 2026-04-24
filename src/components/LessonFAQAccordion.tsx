import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import AppText from "./AppText";

export type LessonFAQItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: LessonFAQItem[];
  title?: string;
  intro?: string;
  defaultOpenId?: string;
  openFirst?: boolean;
  style?: ViewStyle;
};

const LessonFAQAccordion = ({
  items,
  title = "سوال و جواب",
  intro,
  defaultOpenId,
  openFirst = true,
  style,
}: Props) => {
  const initialOpenId = defaultOpenId ?? (openFirst ? items[0]?.id : undefined);
  const [openId, setOpenId] = React.useState<string | undefined>(initialOpenId);

  return (
    <View style={[styles.wrapper, style]}>
      {title ? (
        <AppText variant="heading" lang="ur" size={26} color="#0B3D91" align="right">
          {title}
        </AppText>
      ) : null}

      {intro ? (
        <View style={styles.intro}>
          <AppText lang="ur" size={18} color="#1E3A8A">
            {intro}
          </AppText>
        </View>
      ) : null}

      {items.map((item) => {
        const open = openId === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => setOpenId(open ? undefined : item.id)}
            style={styles.card}
          >
            <View style={styles.questionRow}>
              <AppText lang="ur" size={22} color="#DB2777" style={styles.question}>
                سوال: {item.question}
              </AppText>
              <Text style={styles.icon}>{open ? "-" : "+"}</Text>
            </View>

            {open ? (
              <AppText lang="ur" size={20} color="#1D4ED8" style={styles.answer}>
                جواب: {item.answer}
              </AppText>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
};

export default LessonFAQAccordion;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 22,
  },
  intro: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  questionRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  question: {
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    color: "#1D4ED8",
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    marginLeft: 10,
    overflow: "hidden",
  },
  answer: {
    marginTop: 8,
  },
});
