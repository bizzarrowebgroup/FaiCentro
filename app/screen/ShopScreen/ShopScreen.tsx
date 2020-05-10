import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, Platform, Dimensions, ActivityIndicator, StatusBar, ScrollView, View, Image, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ShopScreen.styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ModalHeader } from "../../components";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(100);
const slideHeight = viewportHeight * 0.36;
// const itemHorizontalMargin = wp(2);
// const itemWidth = slideWidth + itemHorizontalMargin * 2;

const sliderWidth = slideWidth;
const itemWidth = slideWidth;

interface Props {
    navigation: any;
    route: any;
}
interface ShopInfoInter {
    field_main_image?: any;
    title?: string;
    field_address?: string;
    body?: string;
    field_categorie_esercente?: string;
}
type shopInfo = ShopInfoInter;

const ShopScreen: React.FC<Props> = ({
    navigation,
    route
}) => {
    const { shopID } = route.params;
    const [hasError, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [shopInfo, setShopInfo] = useState<shopInfo>({});
    const [SnapIndex, setSnapIndex] = useState(0);
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

    const _renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={{ width: slideWidth, height: 300 }}>
                <Image
                    source={{ uri: item.src }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    resizeMode="cover"
                />
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
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <ModalHeader navigation={navigation} />
                {shopInfo.field_main_image && shopInfo.field_main_image.length > 0 && <><Carousel
                    containerCustomStyle={{
                        flexGrow: 0,
                    }}
                    ref={(c) => { _carousel = c; }}
                    data={shopInfo.field_main_image}
                    renderItem={_renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={(index) => setSnapIndex(index)}
                    autoplay={{true}}
                    shouldOptimizeUpdates={false}
                />
                    <Pagination
                        dotsLength={shopInfo.field_main_image.length}
                        activeDotIndex={SnapIndex}
                        containerStyle={{ alignSelf: "center", backgroundColor: 'transparent', position: "absolute", top: 300, zIndex: 10 }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'white'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.9}
                    /></>}
                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.shopBoxText}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                        <Text style={[styles.shopTextTitle]}>{shopInfo.title}</Text>
                        <Text style={[styles.shopTextAddress]}>{shopInfo.field_address}</Text>
                        <Text style={[styles.shopTextInfos]}>{shopInfo.body}</Text>
                        <Text style={[styles.shopText]}>{"Categorie"}</Text>
                        <Text style={[styles.shopTextCategorie]}>{shopInfo.field_categorie_esercente}</Text>
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
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ShopScreen
