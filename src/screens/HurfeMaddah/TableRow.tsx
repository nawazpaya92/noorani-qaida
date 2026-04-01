import React from "react";
import { Text, View } from "react-native";
import AppText from "../../components/AppText";
import { tableRuleStyles } from "./tableRuleStyles";
import { COLUMN_FLEX } from "./tableConfig";

const TableRow = ({ item, index }: any) => {
    const isEven = index % 2 === 0;

    return (
        <View
            style={[
                tableRuleStyles.row,
                {
                    backgroundColor: isEven ? "#FFFFFF" : "#FAFCFB",
                },
            ]}
        >

            {/* Example */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.example }]}>
                <AppText style={[tableRuleStyles.exampleText, { color: "#1d1dcfff" }]} variant="body" weight="bold" >
                    {item.example}
                </AppText>
            </View>

            {/* Madd */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.madd }]}>
                <Text
                    style={[
                        tableRuleStyles.icon,
                        {
                            color: item.madd ? "#2E7D32" : "#C62828",
                            fontFamily: undefined,
                            fontSize: 18,
                        },
                    ]}
                >
                    {item.madd ? "✓" : "✕"}
                </Text>
            </View>

            {/* First Sign */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.sign1 }]}>
                <Text
                    style={[
                        tableRuleStyles.icon,
                        {
                            color: item.firstSign ? "#2E7D32" : "#C62828",
                            fontFamily: undefined,
                            fontSize: 18,
                        },
                    ]}
                >
                    {item.firstSign ? "✓" : "✕"}
                </Text>
            </View>

            {/* Second Sign */}
            <View style={[tableRuleStyles.cellWrapper, tableRuleStyles.separator, { flex: COLUMN_FLEX.sign2 }]}>
                <Text
                    style={[
                        tableRuleStyles.icon,
                        {
                            color: item.secondSign ? "#2E7D32" : "#C62828",
                            fontFamily: undefined,
                            fontSize: 18,
                        },
                    ]}
                >
                    {item.secondSign ? "✓" : "✕"}
                </Text>
            </View>

            {/* Rule */}
            <View style={[tableRuleStyles.cellWrapper, { flex: COLUMN_FLEX.rule }]}>
                <AppText style={tableRuleStyles.ruleText} variant="body">
                    {item.rule}
                </AppText>
            </View>

        </View>
    );
};
export default TableRow;