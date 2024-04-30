import {Box, Heading, FlatList, HStack, VStack, Text, Avatar} from '@gluestack-ui/themed-native-base'
export const TodoScreen = () => {
    const data = [
        {id: 0, avatarUrl: "",fullName:"dsds", timeStamp:"timeStamp",recentText:"dsds"},
        {id: 1, avatarUrl: "",fullName:"dsds", timeStamp:"timeStamp",recentText:"dsds"},
        {id: 2, avatarUrl: "",fullName:"dsds", timeStamp:"timeStamp",recentText:"dsds"},
    ]
    return <Box py="$10">
        <Heading size="xl" p="$4" pb="$3">
            Inbox
        </Heading>
        <FlatList
            data={data}
            renderItem={({item}) => (
                <Box
                    borderBottomWidth="$1"
                    borderColor="$trueGray800"
                    $dark-borderColor="$trueGray100"
                    $base-pl={0}
                    $base-pr={0}
                    $sm-pl="$4"
                    $sm-pr="$5"
                    py="$2"
                >
                    <HStack space="md" justifyContent="space-between">
                        <VStack>
                            <Text
                                color="$coolGray800"
                                fontWeight="$bold"
                                $dark-color="$warmGray100"
                            >
                                {item.fullName}
                            </Text>
                            <Text color="$coolGray600" $dark-color="$warmGray200">
                                {item.recentText}
                            </Text>
                        </VStack>
                        <Text
                            fontSize="$xs"
                            color="$coolGray800"
                            alignSelf="flex-start"
                            $dark-color="$warmGray100"
                        >
                            {item.timeStamp}
                        </Text>
                    </HStack>
                </Box>
            )}
            keyExtractor={(item) => item.id}
        />
    </Box>
}
