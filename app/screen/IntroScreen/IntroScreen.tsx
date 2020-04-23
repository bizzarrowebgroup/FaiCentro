import React, { useEffect } from "react"
import { View, Image, StatusBar, ActivityIndicator } from "react-native"

import styles from "./IntroScreen.styles";

export interface Props {
  navigation: any;
}
const IntroScreen: React.FC<Props> = ({
  navigation
}) => {

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true)
    setTimeout(() => {
      navigation.navigate("DashBoard")
    }, 20)
  }, [])

  return (
    <View style={styles.introbox}>
      <Image source={require("../../../assets/logoFaiCentro.png")} style={styles.imageLogo} />
      <ActivityIndicator color={"white"} animating size={"large"} style={{ marginVertical: 20 }} />
    </View>
  )
}

export default IntroScreen
