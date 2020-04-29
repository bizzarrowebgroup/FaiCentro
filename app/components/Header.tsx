import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    headerBox: {
        height: 77 + Constants.statusBarHeight, //Constants.statusBarHeight * 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: "absolute",
        top: 0,
        // marginTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "white",
        width: "100%",
        zIndex: 1,
    },
    headerBoxText: {
        marginTop: Constants.statusBarHeight
        // marginVertical: 28,
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
        top: 25,
        right: 40
    },
    iconShop: {
        position: "absolute",
        top: 25,
        right: 0
    },
    imageLogo: {
        width: "50%",
        height: 50,
        resizeMode: "contain"
    }
});

type Props = {
    onPressFeedback?: () => void;
    onPressShop?: () => void;
};

const Header: React.FC<Props> = ({
    onPressFeedback,
    onPressShop
}) => {
    return (
        <View style={styles.headerBox}>
            <View style={styles.headerBoxText}>
                <Text style={styles.headerText}>{"MESTRE SHOPPING DISTRICT"}</Text>
                <Image source={require("../../assets/logoFaiCentro-red.png")} style={styles.imageLogo} />
                <TouchableOpacity style={styles.iconDebug} onPress={onPressFeedback}>
                    <Image style={{
                        width: 30,
                        height: 30,
                    }} source={require("../../assets/icon-debug.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconShop} onPress={onPressShop}>
                    <Image style={{
                        width: 30,
                        height: 30,
                    }} source={require("../../assets/icon-shop.png")} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;