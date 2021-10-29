import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  headerBox: {
    position: "absolute",
    top: 0,
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#050505",
    width: "100%",
    zIndex: 1,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  headerBoxText: {
    marginTop: Constants.statusBarHeight,
  },
  headerText: {
    color: "white",
    marginLeft: 2,
    // fontFamily: "Lato-Regular",
    letterSpacing: 1.6,
    fontSize: 14,
  },
  headerTextLogo: {
    tintColor: "white",
    marginTop: 6,
    // fontFamily: "Lato-Bold",
    fontSize: 39,
  },
  iconDebug: {
    position: "absolute",
    top: 25,
    right: 40,
  },
  iconShop: {
    position: "absolute",
    top: 25,
    right: 0,
  },
  imageLogo: {
    width: "50%",
    height: 50,
    resizeMode: "contain",
    tintColor: "white",
  },
  pageTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 5,
  },
});

type Props = {
  onPressFeedback?: () => void;
  onPressShop?: () => void;
  pageTitle?: string;
  hidebuttons: boolean;
};

const Header: React.FC<Props> = ({
  onPressFeedback,
  onPressShop,
  pageTitle,
  hidebuttons = false,
}) => {
  return (
    <View style={styles.headerBox}>
      <View style={styles.headerBoxText}>
        <Text style={styles.headerText}>{"MESTRE SHOPPING DISTRICT"}</Text>
        {!pageTitle && (
          <Image
            source={require("../../assets/logoFaiCentro-red.png")}
            style={styles.imageLogo}
          />
        )}
        {!hidebuttons && (
          <>
            <TouchableOpacity
              style={styles.iconDebug}
              onPress={onPressFeedback}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require("../../assets/icon-debug.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconShop} onPress={onPressShop}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require("../../assets/icon-shop.png")}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      {pageTitle && <Text style={styles.pageTitle}>{pageTitle}</Text>}
    </View>
  );
};

export default Header;
