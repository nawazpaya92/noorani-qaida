import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    LayoutAnimation,
    Animated,
} from 'react-native';
import ExpandableTitle from './ExpandableTitle';

export default function ExpandableSection({
    title,
    children,
    open,
    onToggle,
}: {
    title: string;
    children: React.ReactNode;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onToggle} style={styles.pressable}>
                <ExpandableTitle title={title} open={open} />
            </Pressable>

            {open && <View style={styles.content}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    pressable: {
        borderRadius: 20,
    },
    content: {
        marginTop: 14,
    },
});
