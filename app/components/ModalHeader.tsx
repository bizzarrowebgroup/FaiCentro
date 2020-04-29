import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    headerModalBox: {
        height: 70,
        backgroundColor: "white",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        // borderBottomWidth: 1,
        // borderBottomColor: "darkgrey"
    },
});

type Props = {
    onPress?: () => void;
};

const ModalHeader: React.FC<Props> = ({
    onPress
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