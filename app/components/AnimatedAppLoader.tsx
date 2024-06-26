import { AppLoading, SplashScreen } from "expo";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = React.useState(false);

    const startAsync = React.useMemo(
        () => () => {
            return Asset.fromModule(image).downloadAsync();
        },
        [image]
    );

    const onFinish = React.useMemo(() => setSplashReady(true), []);

    if (!isSplashReady) {
        return (
            <AppLoading
                startAsync={startAsync}
                onError={console.error}
                onFinish={onFinish}
            />
        );
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
    const animation = React.useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = React.useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
        false
    );

    React.useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    const onImageLoaded = React.useMemo(() => async () => {
        SplashScreen.hide();
        try {
            const images = [
                require("../../assets/logoFaiCentro.png"),
                require("../../assets/icon-debug.png"),
                require("../../assets/icon-shop.png"),
            ];
            const fonts = [{
                ...MaterialCommunityIcons.font,
                "Lato-Bold": require("../../assets/fonts/Lato-Bold.ttf"),
                "Lato-Black": require("../../assets/fonts/Lato-Black.ttf"),
                "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
            }];
            const cacheImages = images.map(image => {
                return Asset.fromModule(image).downloadAsync();
            });
            const cacheFonts = fonts.map(font => {
                return Font.loadAsync(font);
            })
            await Promise.all([cacheImages, cacheFonts]);
        } catch (e) {
            console.log(e, "[errors-Apploading]")
        } finally {
            setAppReady(true);
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.manifest.splash.backgroundColor,
                            opacity: animation,
                        },
                    ]}>
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: Constants.manifest.splash.resizeMode || "contain",
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}

export default AnimatedAppLoader;