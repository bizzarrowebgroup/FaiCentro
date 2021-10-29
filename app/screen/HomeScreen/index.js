import React, { useEffect } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components";

const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        StatusBar.setBarStyle("light-content", true)
    }, [])

    return (
        <View style={{ backgroundColor: "#050505", height: "100%" }}>
            <SafeAreaView>
                <Header
                    onPressFeedback={() => console.log("PressedFeedback")}
                    onPressShop={() => console.log("PressedShop")}
                // pageTitle={"Home"}
                />
                <ScrollView>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
