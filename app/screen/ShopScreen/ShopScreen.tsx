import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Platform,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import qs from "qs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ShopScreen.styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { ModalHeader } from "../../components";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
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
  body?: string;
  field_categorie_esercente?: string;
  field_address: string;
  field_telefono: string;
  field_account_instagram: string;
  field_email: string;
  field_url_facebook: string;
  field_sito_web: string;
}
type shopInfo = ShopInfoInter;

function isObject(o: any) {
  return o instanceof Object && !(o instanceof Array);
}

const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shopID } = route.params;
  const [hasError, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shopInfo, setShopInfo] = useState<shopInfo>({});
  const [SnapIndex, setSnapIndex] = useState(0);
  const _carousel = useRef(null);

  async function fetchData() {
    const res = await fetch(
      "https://faicentro.it/esercenti/" + shopID + "/json"
    );
    res
      .json()
      .then((res) => {
        console.log(JSON.stringify(res[0], null, 4), "jonares");
        setIsLoading(false);
        setShopInfo(res[0]);
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const _renderItem = (
    { item, index }: { item: any; index: any },
    parallaxProps: any
  ) => {
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
  };

  const sendEmail = async (
    to: any,
    subject: any,
    body: any,
    options: any = {}
  ) => {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc,
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      console.warn("Provided URL can not be handled");
    }

    return Linking.openURL(url);
  };

  const openMaps = async (address: string) => {
    if (Platform.OS === "android") {
      await Linking.openURL(`http://maps.google.com/maps?daddr=${address}`);
    } else {
      await Linking.openURL(`http://maps.apple.com/maps?daddr=${address}`);
    }
  };

  const openInstagram = async (account: string) =>
    await Linking.openURL(`https://instagram.com/${account}`);

  const goTo = async (url: string) => await Linking.openURL(url);

  const call = async (phoneNumber: string) =>
    await Linking.openURL(`tel:${phoneNumber}`);

  if (isLoading) {
    return (
      <View style={styles.shopBox}>
        <Image
          source={require("../../../assets/logoFaiCentro-red.png")}
          style={styles.imageLogo}
        />
        <ActivityIndicator
          color={"black"}
          animating
          size={"large"}
          style={{ marginVertical: 20 }}
        />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ModalHeader navigation={navigation} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.shopBoxText}
      >
        {shopInfo.field_main_image && shopInfo.field_main_image.length > 0 && (
          <>
            <Carousel
              containerCustomStyle={{
                flexGrow: 0,
              }}
              ref={_carousel}
              data={shopInfo.field_main_image}
              renderItem={_renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              onSnapToItem={(index) => setSnapIndex(index)}
              autoplay={true}
              shouldOptimizeUpdates={false}
            />
            <Pagination
              dotsLength={shopInfo.field_main_image.length}
              activeDotIndex={SnapIndex}
              containerStyle={{
                alignSelf: "center",
                backgroundColor: "transparent",
                position: "absolute",
                top: 240,
                zIndex: 10,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "white",
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.9}
            />
          </>
        )}

        {shopInfo.field_main_image && isObject(shopInfo.field_main_image) && (
          <>
            <Image
              source={{ uri: shopInfo.field_main_image.src }}
              style={{ height: 300, resizeMode: "cover", width: "100%" }}
            />
          </>
        )}

        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={[styles.shopTextTitle]}>{shopInfo.title}</Text>
          <Text style={[styles.shopTextAddress]}>{shopInfo.field_address}</Text>
          <Text style={[styles.shopTextInfos]}>{shopInfo.body}</Text>
          <Text style={[styles.shopText]}>{"Categorie"}</Text>
          <Text style={[styles.shopTextCategorie]}>
            {shopInfo.field_categorie_esercente}
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={[styles.shopText]}>{"Contatti"}</Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {shopInfo.field_address !== "" && (
                <TouchableOpacity
                  style={[styles.iconBox, { marginRight: 5 }]}
                  onPress={() => openMaps(shopInfo.field_address)}
                >
                  <MaterialCommunityIcons
                    name="crosshairs-gps"
                    size={30}
                    color="#1f1f20"
                  />
                </TouchableOpacity>
              )}
              {shopInfo.field_telefono !== "" && (
                <TouchableOpacity
                  style={[styles.iconBox, { marginHorizontal: 5 }]}
                  onPress={() => call(shopInfo.field_telefono)}
                >
                  <MaterialCommunityIcons
                    name="phone-in-talk"
                    size={30}
                    color="#1f1f20"
                  />
                </TouchableOpacity>
              )}
              {shopInfo.field_email !== "" && (
                <TouchableOpacity
                  style={[styles.iconBox, { marginHorizontal: 5 }]}
                  onPress={() =>
                    sendEmail(
                      shopInfo.field_email,
                      "Domanda | Saluti da Fai Centro!",
                      "Vorrei chiederle ...."
                    )
                  }
                >
                  <MaterialCommunityIcons
                    name="email"
                    size={30}
                    color="#1f1f20"
                  />
                </TouchableOpacity>
              )}
              {shopInfo.field_url_facebook !== "" && (
                <TouchableOpacity
                  style={[styles.iconBox, { marginHorizontal: 5 }]}
                  onPress={() => goTo(shopInfo.field_url_facebook)}
                >
                  <MaterialCommunityIcons
                    name="facebook"
                    size={30}
                    color="#1f1f20"
                  />
                </TouchableOpacity>
              )}
              {shopInfo.field_account_instagram !== "" && (
                <TouchableOpacity
                  style={[styles.iconBox, { marginHorizontal: 5 }]}
                  onPress={() =>
                    openInstagram(shopInfo.field_account_instagram)
                  }
                >
                  <MaterialCommunityIcons
                    name="instagram"
                    size={30}
                    color="#1f1f20"
                  />
                </TouchableOpacity>
              )}
              {shopInfo.field_sito_web !== "" && (
                <TouchableOpacity
                  style={[styles.iconBox, { marginHorizontal: 5 }]}
                  onPress={() => goTo(shopInfo.field_sito_web)}
                >
                  <MaterialCommunityIcons
                    name="web"
                    size={30}
                    color="#1f1f20"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopScreen;
