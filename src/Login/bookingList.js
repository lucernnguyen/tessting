import React, { Component, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Dimensions,
    TextInput,
    Image,
    StyleSheet, Button
} from 'react-native';
export default BookingList = () => {
    return (
        <SafeAreaView>
            <View style={styles.center}>
                <Text>This is the BookingLists screen</Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
});