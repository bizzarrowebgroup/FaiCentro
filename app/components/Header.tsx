import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    headerBox: {
        height: 77, //Constants.statusBarHeight * 4,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        marginHorizontal: 10
    },
    headerBoxText: {
        marginTop: 8,
    },
    headerText: {
        marginLeft: 2,
        fontFamily: "Lato-Regular",
        letterSpacing: 1.6,
        fontSize: 14
    },
    headerTextLogo: {
        marginTop: 6,
        fontFamily: "Lato-Bold",
        fontSize: 39
    },
    iconDebug: {
        position: "absolute",
        top: 0,
        right: 40
    },
    iconShop: {
        position: "absolute",
        top: 0,
        right: 0
    }
});

export type Props = {
    onPress?: () => void;
};

const Header: React.FC<Props> = ({
    onPress
}) => {
    return (
        <View style={styles.headerBox}>
            <View style={styles.headerBoxText}>
                <Text style={styles.headerText}>{"MESTRE SHOPPING DISTRICT"}</Text>
                <Text style={styles.headerTextLogo}>{"Fai Centro!"}</Text>
            </View>
            <TouchableOpacity style={styles.iconDebug}>
                <Image style={{
                    width: 30,
                    height: 30,
                }} source={require("../../assets/icon-debug.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconShop}>
                <Image style={{
                    width: 30,
                    height: 30,
                }} source={require("../../assets/icon-shop.png")} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;