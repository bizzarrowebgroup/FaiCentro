import * as React from "react";
import { SplashScreen } from "expo";

import Routes from "./app/Routes";
import { AnimatedAppLoader } from "./app/components"

SplashScreen.preventAutoHide();

export default function App() {
  return (
    <AnimatedAppLoader image={require("./assets/splash.png")}>
      <Routes />
    </AnimatedAppLoader>
  );
}