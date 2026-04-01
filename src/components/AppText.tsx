import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

type Variant = 'body' | 'heading' | 'caption';
type Lang = 'ur' | 'ar';

interface Props extends TextProps {
    children: React.ReactNode;
    size?: number;
    color?: string;
    variant?: Variant;
    weight?: 'regular' | 'bold';
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    lang?: Lang;
}

/** 🎯 Only 2 fonts */
const FONT_MAP = {
    ur: 'Noori',
    ar: 'Quranic',
};

export default function AppText({
    children,
    size,
    color = '#111827',
    variant = 'body',
    weight = 'regular',
    align,
    lang = 'ur',
    style,
    ...rest
}: Props) {
    const isRTL = lang === 'ur' || lang === 'ar';
    const resolvedAlign = align ?? (isRTL ? 'right' : 'left');

    const fontFamily = FONT_MAP[lang];

    /** 🎯 Variant + Language based styling */
    const computedStyle = (() => {
        let base: any = {};

        // ✅ Urdu Heading → Bigger + premium look
        if (variant === 'heading' && lang === 'ur') {
            const finalSize = size ?? 28;

            base = {
                fontSize: finalSize,
                lineHeight: finalSize * 1.5,
            };
        }

        // ✅ Arabic Body → Better readability for ayat
        if (variant === 'body' && lang === 'ar') {
            const finalSize = size ?? 22;

            base = {
                fontSize: finalSize,
                lineHeight: finalSize * 1.6, // 🔥 dynamic fix
                letterSpacing: 0.2
            };
        }

        // ✅ Default fallback
        else {
            base = variantStyles[variant];
        }

        return base;
    })();

    /** 🎯 Weight handling (Noori/Quranic usually single weight) */
    const weightStyle =
        weight === 'bold'
            ? { fontWeight: '700' } // fallback (if font supports)
            : {};

    return (
        <Text
            {...rest}
            style={[

                styles.base,
                isRTL && styles.rtl,

                computedStyle,                 // 🔥 intelligent defaults
                { fontFamily },                // 🔥 controlled fonts

                size ? { fontSize: size, lineHeight: size * 1.6 } : null, // 🔥 override safe
                { color, textAlign: resolvedAlign, includeFontPadding: true }, // 🔥 color + align

                weightStyle,
                style,
            ].filter(Boolean)}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    base: {},
    rtl: {
        writingDirection: 'rtl',
    },
});

const variantStyles = StyleSheet.create({
    body: {
        fontSize: 18,
        lineHeight: 28,
    },
    heading: {
        fontSize: 24,
        lineHeight: 34,
    },
    caption: {
        fontSize: 14,
        color: '#6B7280',
    },
});