import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    LayoutAnimation,
    Animated,
} from 'react-native';
import ExpandableTitle from './ExpandableTitle';
import { forwardRef } from 'react';


const ExpandableSection = forwardRef<View, Props>(
    ({ title, children, open, onToggle }, ref) => {
        return (
            <View ref={ref} style={styles.container}>
                <Pressable onPress={onToggle} style={styles.pressable}>
                    <ExpandableTitle title={title} open={open} />
                </Pressable>

                {open && <View style={styles.content}>{children}</View>}
            </View>
        );
    }
);

export default ExpandableSection;


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
