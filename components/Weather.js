import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Weather = ({ data }) => {
    return (
        <View>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    )
}

export default Weather
