import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Animated,
    LayoutChangeEvent,
} from "react-native";
import * as Haptics from "expo-haptics";

type TabItem = {
    key: string
    example: string
    label: string
    color: string
    audio?: any
    isCombined?: boolean
}

export default function HarkaatTabs({
    tabs,
    active,
    onChange,
}: {
    tabs: TabItem[];
    active: string;
    onChange: (key: string) => void;
}) {
    const [tabWidth, setTabWidth] = React.useState(0);

    const translateX = React.useRef(new Animated.Value(0)).current;
    const scaleX = React.useRef(new Animated.Value(1)).current;

    const [indicatorColor, setIndicatorColor] = React.useState(tabs[0]?.color);

    const onLayout = (e: LayoutChangeEvent) => {
        const width = e.nativeEvent.layout.width;
        setTabWidth(width / tabs.length);
    };

    React.useEffect(() => {
        if (!tabWidth) return;

        const index = tabs.findIndex((t) => t.key === active);

        if (index === -1) return;

        setIndicatorColor(tabs[index].color);

        scaleX.stopAnimation();
        translateX.stopAnimation();

        scaleX.setValue(1.12);

        Animated.parallel([
            Animated.spring(translateX, {
                toValue: index * tabWidth,
                useNativeDriver: true,
                speed: 22,
                bounciness: 15,
            }),
            Animated.timing(scaleX, {
                toValue: 1,
                duration: 160,
                useNativeDriver: true,
            }),
        ]).start();
    }, [active, tabWidth, tabs]);

    return (
        <View style={styles.container} onLayout={onLayout}>
            {tabWidth > 0 && (
                <Animated.View
                    style={[
                        styles.slider,
                        {
                            width: tabWidth,
                            backgroundColor: indicatorColor,
                            transform: [{ translateX }, { scaleX }],
                        },
                    ]}
                />
            )}

            {tabs.map((tab) => (
                <Pressable
                    key={tab.key}
                    style={[
                        styles.tab,
                        tab.isCombined && styles.combinedTab
                    ]}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        onChange(tab.key);
                    }}
                >
                    <Text style={[styles.example, active === tab.key && styles.activeText]}>
                        {tab.example}
                    </Text>

                    <Text style={[styles.label, active === tab.key && styles.activeText]}>
                        {tab.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 12,
        marginBottom: 10,
        height: 96,
        padding: 6,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    combinedTab: {
        borderRightWidth: 0.5,
        borderRightColor: "#d3d3d3",

    },
    example: {
        fontSize: 32,
        includeFontPadding: false,
        fontFamily: "NotoNaskhArabic-bold",
        writingDirection: "rtl",
    },

    label: {
        fontSize: 14,
        textAlign: "auto",
        includeFontPadding: false,
        fontFamily: "NotoNaskhArabic-bold",
        writingDirection: "rtl",
        fontWeight: "600",
    },

    activeText: {
        color: "#FFFFFF",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2, // keep text above slider


    },

    text: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1D4ED8",
        letterSpacing: 0.5,
    },

    slider: {
        position: "absolute",
        top: 6,
        bottom: 6,

        borderRadius: 16,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },

        elevation: 6,
    },
});

