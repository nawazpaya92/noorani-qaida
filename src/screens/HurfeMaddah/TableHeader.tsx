import React from "react";
import { Text, View } from "react-native";
import AppText from "../../components/AppText";
import { tableRuleStyles } from "./tableRuleStyles";
import { COLUMN_FLEX } from "./tableConfig";

const TableHeader = () => {
    return (
        <View style={tableRuleStyles.headerRow}>

            {/* Example */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.example }]}>
                <AppText style={tableRuleStyles.headerText} variant="heading" color="#2E7D32">
                    مثال
                </AppText>
            </View>

            {/* Madd */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.madd }]}>
                <AppText style={tableRuleStyles.headerText} variant="heading" color="#2E7D32">
                    مد ہوگا یا نہیں
                </AppText>
            </View>

            {/* Sign 1 */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.sign1 }]}>
                <AppText style={tableRuleStyles.headerText} variant="heading" color="#2E7D32">
                    پہلی علامت
                </AppText>
            </View>

            {/* Sign 2 */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.sign2 }]}>
                <AppText style={tableRuleStyles.headerText} variant="heading" color="#2E7D32">
                    دوسری علامت
                </AppText>
            </View>

            {/* Rule */}
            <View style={[tableRuleStyles.cellWrapper, { flex: COLUMN_FLEX.rule }]}>
                <AppText style={tableRuleStyles.headerText} variant="heading" color="#2E7D32">
                    الف مدہ بنانا ہو تو
                </AppText>
            </View>

        </View>
    );
};

export default TableHeader;