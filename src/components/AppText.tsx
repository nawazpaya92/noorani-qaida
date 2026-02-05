import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

/**
 * Global typography component for the Qaida app
 * --------------------------------------------------
 * Supports:
 * - Urdu / Arabic / English via `lang`
 * - size, color, weight, alignment
 * - heading / body / caption variants
 * - RTL safety when needed
 */

type Variant = 'body' | 'heading' | 'caption';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold';
type Lang = 'ur' | 'ar' | 'en';

interface Props extends TextProps {
    children: React.ReactNode;
    size?: number;
    color?: string;
    variant?: Variant;
    weight?: Weight;
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    lang?: Lang;
}

/** Font mapping for Arabic/Urdu */
const fontMap: Record<Weight, string> = {
    regular: 'Naskh-Regular',
    medium: 'Naskh-Medium',
    semibold: 'Naskh-SemiBold',
    bold: 'Naskh-Bold',
};

/** Heading font now also uses Naskh weights for consistency */

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

    /** Default alignment based on language */
    const resolvedAlign = align ?? (isRTL ? 'right' : 'left');

    /** Font selection */
    const fontFamily =
        lang === 'en'
            ? undefined
            : fontMap[weight];

    const variantStyle = variantStyles[variant];

    return (
        <Text
            {...rest}
            style={[
                styles.base,
                isRTL && styles.rtl,
                variantStyle,
                fontFamily ? { fontFamily } : null,
                size ? { fontSize: size } : null,
                { color, textAlign: resolvedAlign },
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
        fontSize: 22,
        lineHeight: 34,
        textAlign: 'center',
    },
    caption: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6B7280',
    },
});
