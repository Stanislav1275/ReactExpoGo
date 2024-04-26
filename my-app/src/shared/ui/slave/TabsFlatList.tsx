import {Column} from "./layout";
import {FlatList, StyleSheet} from "react-native";
import React from 'react';
import {ListName, TabsButton} from "shared/ui/slave/TabsButton";

export const TabsFlatList = (props) => {
    const {
        selected,
        onSelect,
        labelField = 'name',
        keyField = 'id',
        options,
        size = 'medium',
        style
    } = props;

    const listRef = React.useRef(null);
    console.log(options)
    const handleSelect = (type, index) => {
        onSelect(type);
        listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewPosition: 0.5,
        });
    }

    const renderItem = React.useCallback(
        ({item, index}) => item ? (
            <TabsButton
                key={`list-${item[keyField]}-${index}`}
                onPress={() => handleSelect(item[keyField], index)}
                selected={selected === item[keyField]}
                size={size}
            >
                <ListName
                    selected={selected === item[keyField]}
                    lineHeight="paragraphSmall"
                    size={size}
                    weight="medium"
                >
                    {item[labelField]}
                </ListName>
            </TabsButton>
        ) : null,
        [selected]
    );

    const renderKeyExtractor = React.useCallback((item,index) => item?.[keyField]??index, []);
    return (
        <Column>
            <FlatList
                contentContainerStyle={[s.contentContainerStyle, style]}
                data={options}
                horizontal
                keyExtractor={(item, index) =>renderKeyExtractor(item, index)}
                ref={listRef}
                renderItem={renderItem}
                scrollsToTop={false}
                showsHorizontalScrollIndicator={false}
            />
        </Column>
    )
}

const s = StyleSheet.create({
    contentContainerStyle: {
        paddingBottom: 12,
        paddingHorizontal: 16,
        paddingTop: 10,
    }
})

