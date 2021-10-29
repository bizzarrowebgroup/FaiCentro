import * as React from "react";

import IntroScreen from "./screen/IntroScreen";
import DashScreen from "./screen/DashScreen";
import ShopScreen from "./screen/ShopScreen";
import HomeScreen from "./screen/HomeScreen";
import EventsScreen from "./screen/EventsScreen";
import SettingsScreen from "./screen/SettingsScreen";
import { Fontisto } from "@expo/vector-icons";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./context";

// const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainFlow: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          // iconName = focused ? "" : "";
          if (route.name === "DashBoard") {
            iconName = "home";
          } else if (route.name === "Shops") {
            iconName = "map";
          } else if (route.name === "Events") {
            iconName = "ticket";
          } else if (route.name === "Settings") {
            iconName = "player-settings";
          }
          return <Fontisto name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#C2000B",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#050505",
        },
      })}
    >
      <Tab.Screen
        name="DashBoard"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shops"
        component={DashScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
    // <Stack.Navigator
    //   screenOptions={{
    //     gestureEnabled: false,
    //     presentation: "card",
    //     headerMode: "screen",
    //   }}
    // >
    //   <Stack.Screen
    //     name="DashBoard"
    //     component={DashScreen}
    //     options={{
    //       headerShown: false,
    //     }}
    //   />
    // </Stack.Navigator>
  );
};

export default Routes = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <ModalStack.Navigator initialRouteName="Intro">
          <ModalStack.Screen
            name="Intro"
            component={IntroScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <ModalStack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={MainFlow}
          />
          <ModalStack.Screen
            name="ShopDetails"
            component={ShopScreen}
            options={{
              ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
              cardOverlayEnabled: true,
              gestureEnabled: true,
              presentation: "modal",
            }}
          />
        </ModalStack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};
