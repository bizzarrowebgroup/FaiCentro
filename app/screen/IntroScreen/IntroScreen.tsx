import React, { useContext, useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { AppContext } from "../../context";

import styles from "./IntroScreen.styles";

export interface Props {
  navigation: any;
}
const IntroScreen: React.FC<Props> = ({ navigation }) => {
  const { setShops } = useContext(AppContext);
  const loadApp = async () => {
    const res = await fetch("https://faicentro.it/esercenti/all/json");
    res
      .json()
      .then((res) => {
        setShops(res);
        navigation.navigate("Main");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    loadApp();
  }, []);

  return (
    <View style={styles.introbox}>
      <Image
        source={require("../../../assets/logoFaiCentro.png")}
        style={styles.imageLogo}
      />
      <ActivityIndicator
        color={"white"}
        animating
        size={"large"}
        style={{ marginVertical: 20 }}
      />
    </View>
  );
};

export default IntroScreen;
