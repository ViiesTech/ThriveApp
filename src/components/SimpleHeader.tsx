import React from 'react'
import { View, Text } from 'react-native'

type Prop = {
    heading?: string;
    rightIcon?: any;
}

const SimpleHeader = ({ heading, rightIcon }: Prop) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>SimpleHeader</Text>
            <Text>SimpleHeader</Text>
            {/* <Text>SimpleHeader</Text> */}
            <View />
            <View />
        </View>
    )
}

export default SimpleHeader