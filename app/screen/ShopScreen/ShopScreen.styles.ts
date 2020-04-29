import { StyleSheet } from "react-native";

export default StyleSheet.create({
    line: {
        width: "100%",
        height: 1,
        backgroundColor: 'black'
    },
    shopBox: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white"
    },
    shopBoxText: {
        backgroundColor: "white",
        paddingTop: 20,
        paddingHorizontal: 20
    },
    imageLogo: {
        width: 276,
        height: 173,
        resizeMode: "contain"
    },
    shopText: {
        fontFamily: "Lato-Regular",
        color: "black",
        fontSize: 20
    },
    shopTextCategorie: {
        fontFamily: "Lato-Bold",
        color: "black",
        fontSize: 14,
        marginVertical: 20
    },
    shopTextTitle: {
        fontFamily: "Lato-Bold",
        color: "black",
        fontSize: 25
    },
    shopTextAddress: {
        fontFamily: "Lato-Bold",
        color: "darkgrey",
        fontSize: 17
    },
    shopTextInfos: {
        marginVertical: 20,
        fontFamily: "Lato-Regular",
        color: "black",
        fontSize: 14
    },
    iconBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#e8e9ef',
        borderRadius: 10,
    },
    slider: {
        // marginTop: 15,
        // overflow: 'hidden' // for custom animations
    },
    sliderContentContainer: {
        // paddingVertical: 10 // for custom animation
    },
});