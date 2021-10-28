import * as React from "react";

import IntroScreen from "./screen/IntroScreen";
import DashScreen from "./screen/DashScreen";
import ShopScreen from "./screen/ShopScreen";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

const MainFlow: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Intro" mode="card" headerMode={"screen"} screenOptions={{
            gestureEnabled: false
        }}>
            <Stack.Screen name="Intro" component={IntroScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="DashBoard" component={DashScreen} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default Routes = () => {
    return (<NavigationContainer>
        <ModalStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
                header: undefined,
                cardOverlayEnabled: true,
                gestureEnabled: true
            }}
            headerMode="none"
            mode="modal"
            initialRouteName="Main"
        >
            <ModalStack.Screen
                name="Main"
                options={{ headerShown: false }}
                component={MainFlow}
            />
            <ModalStack.Screen name="ShopDetails" component={ShopScreen} />
        </ModalStack.Navigator>
    </NavigationContainer>);
}
