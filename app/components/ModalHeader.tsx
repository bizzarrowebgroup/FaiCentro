import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    headerModalBox: {
        height: 70,
        backgroundColor: "white",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});

type Props = {
    onPress?: () => void;
    navigation?: any;
};

const ModalHeader: React.FC<Props> = ({
    onPress,
    navigation
}) => {
    return (
        <View style={styles.headerModalBox}>
            <Image style={{
                width: "50%",
                height: 50,
                resizeMode: "contain"
            }} source={require("../../assets/logoFaiCentro-red.png")} />
        </View>
    );
};

export default ModalHeader;