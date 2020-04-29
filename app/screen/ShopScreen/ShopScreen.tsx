import React, { useEffect, useState, useRef } from "react"
import { Dimensions, ActivityIndicator, StatusBar, ScrollView, View, Image, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ShopScreen.styles";
import Carousel from 'react-native-snap-carousel';
import { ModalHeader } from "../../components";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
// const itemWidth = slideWidth + itemHorizontalMargin * 2;
const itemWidth = viewportWidth;

export interface Props {
    navigation: any;
    route: any;
}
const ShopScreen: React.FC<Props> = ({
    navigation,
    route
}) => {
    const { shopID } = route.params;
    const [hasError, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [shopInfo, setShopInfo] = useState({});
    let _carousel = useRef(null);

    async function fetchData() {
        const res = await fetch("https://faicentro.it/esercenti/" + shopID + "/json");
        res.json().then(res => {
            // console.log(res[0],"jonares")
            setIsLoading(false)
            setShopInfo(res[0])
        }).catch(err => {
            setErrors(err)
            setIsLoading(false)
        });
    };

    useEffect(() => {
        fetchData();
        StatusBar.setBarStyle("light-content", true)
        return () => {
            StatusBar.setBarStyle("dark-content", true)
        }
    }, []);

    const _renderItem = ({ item, index }) => {
        return (
            <View>
                {/* <Text style={styles.title}>{item.title}</Text> */}
                <Image source={{ uri: item.src }} style={{ width: "100%", height: 300 }} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.shopBox}>
                <Image source={require("../../../assets/logoFaiCentro-red.png")} style={styles.imageLogo} />
                <ActivityIndicator color={"black"} animating size={"large"} style={{ marginVertical: 20 }} />
            </View>
        )
    } else {
        return (
            <View>
                <ModalHeader />
                {shopInfo.field_main_image && shopInfo.field_main_image.length > 0 && <Carousel
                    ref={(c) => { _carousel = c; }}
                    data={shopInfo.field_main_image}
                    renderItem={_renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    // sliderHeight={200}
                    // itemHeight={200}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    hasParallaxImages={false}
                    loop={true}
                    loopClonesPerSide={1}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    shouldOptimizeUpdates={false}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                />}
                <ScrollView style={styles.shopBoxText}>
                    <Text style={[styles.shopTextTitle]}>{shopInfo.title}</Text>
                    <Text style={[styles.shopTextAddress]}>{shopInfo.field_address}</Text>
                    <Text style={[styles.shopTextInfos]}>{shopInfo.body}</Text>
                    <Text style={[styles.shopText]}>{"Categorie"}</Text>
                    <Text style={[styles.shopTextCategorie]}>{shopInfo.field_categorie_esercente}</Text>
                    {/* <View style={styles.line} /> */}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[styles.shopText]}>{"Contatti"}</Text>
                        <View style={{ flexDirection: "row", marginVertical: 10 }}>
                            <TouchableOpacity style={[styles.iconBox, { marginRight: 5 }]}>
                                <MaterialCommunityIcons name="crosshairs-gps" size={30} color="#1f1f20" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconBox, { marginHorizontal: 5 }]}>
                                <MaterialCommunityIcons name="phone-in-talk" size={30} color="#1f1f20" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconBox, { marginHorizontal: 5 }]}>
                                <MaterialCommunityIcons name="email" size={30} color="#1f1f20" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconBox, { marginHorizontal: 5 }]}>
                                <MaterialCommunityIcons name="facebook" size={30} color="#1f1f20" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconBox, { marginHorizontal: 5 }]}>
                                <MaterialCommunityIcons name="instagram" size={30} color="#1f1f20" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconBox, { marginHorizontal: 5 }]}>
                                <MaterialCommunityIcons name="web" size={30} color="#1f1f20" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ShopScreen
