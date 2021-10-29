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
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import qs from "qs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ShopScreen.styles";
// import Carousel, { Pagination } from "react-native-snap-carousel";
// import { ModalHeader } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import ImageView from "react-native-image-viewing";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const FirstRoute = (props: any) => {
  const { shopInfo, categories } = props.route;
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.shopTextAddress,
          { paddingHorizontal: 20, marginTop: 20 },
        ]}
      >
        {shopInfo.field_address}
      </Text>
      {shopInfo.body !== "" && (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.shopText}>{"Descrizione"}</Text>
          <Text style={styles.shopTextInfos}>{shopInfo.body}</Text>
        </View>
      )}
      {categories && (
        <>
          <Text
            style={[
              styles.shopText,
              {
                paddingHorizontal: 20,
                marginTop: shopInfo.body == "" ? 20 : 0,
              },
            ]}
          >
            {"Categorie"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            {categories.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "lightgray",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginLeft: index > 0 ? 5 : 0,
                  marginVertical: 5,
                }}
              >
                <Text style={styles.shopTextCategorie}>{item}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const SecondRoute = (props: any) => {
  const { shopInfo, openMaps, call, sendEmail, goTo, openInstagram } =
    props.route;
  // console.log("shopInfo", shopInfo);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          {/* <Text style={[styles.shopText]}>{"Contatti"}</Text> */}
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
                onPress={() => openInstagram(shopInfo.field_account_instagram)}
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
                <MaterialCommunityIcons name="web" size={30} color="#1f1f20" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

// const ThirdRoute = (props: any) => {
//   const { shopInfo } = props.route;
//   // console.log("shopInfo", shopInfo);
//   return <View style={{ flex: 1, backgroundColor: "black" }} />;
// };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  // third: ThirdRoute,
});

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
  field_categorie_esercente: string;
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
  const [categories, setCategories] = useState(undefined);
  const _carousel = useRef(null);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes, setRoutes] = React.useState([]);

  const [images, setImage] = React.useState([]);
  const [visible, setIsVisible] = useState(false);

  async function fetchData() {
    const res = await fetch(
      "https://faicentro.it/esercenti/" + shopID + "/json"
    );
    res
      .json()
      .then((res) => {
        console.log(JSON.stringify(res[0], null, 4), "jonares");
        const _cate =
          res[0]?.field_categorie_esercente !== ""
            ? res[0]?.field_categorie_esercente.split(", ")
            : undefined;
        setCategories(_cate);
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

  useEffect(() => {
    if (shopInfo)
      setRoutes([
        { key: "first", title: "INFO", shopInfo, categories },
        {
          key: "second",
          title: "SOCIAL",
          shopInfo,
          openMaps,
          call,
          sendEmail,
          goTo,
          openInstagram,
        },
        // { key: "third", title: "EVENTI", shopInfo, categories },
      ]);
  }, [shopInfo, categories]);

  // const _renderItem = (
  //   { item, index }: { item: any; index: any },
  //   parallaxProps: any
  // ) => {
  //   return (
  //     <View style={{ width: slideWidth, height: 300 }}>
  //       <Image
  //         source={{ uri: item.src }}
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //         }}
  //         resizeMode="cover"
  //       />
  //     </View>
  //   );
  // };

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

  const openGallery = (gallery: any) => {
    const _images = gallery.map((item: any) => ({ uri: item.src }));
    // console.log("--_images", _images);
    setImage(_images);
    setIsVisible(true);
  };

  if (isLoading) {
    return (
      <View style={styles.shopBox}>
        <Image
          source={require("../../../assets/logoFaiCentro-red.png")}
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
  }
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#A00009" }}
      style={{ backgroundColor: "black" }}
    />
  );
  return (
    <>
      <View style={{ backgroundColor: "black", height: "100%" }}>
        <View style={styles.shopBoxText}>
          {shopInfo.field_main_image && isObject(shopInfo.field_main_image) && (
            <View style={{ height: 250 }}>
              <Image
                source={{ uri: shopInfo.field_main_image.src }}
                style={{ height: 250, resizeMode: "cover", width: "100%" }}
              />
              <LinearGradient
                // Background Linear Gradient
                colors={["transparent", "rgba(0,0,0,.3)", "rgba(0,0,0,1)"]}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 250,
                  backgroundColor: "transparent",
                }}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: -50,
                  zIndex: 99,
                }}
              >
                <Text style={[styles.shopTextTitle]}>
                  {shopInfo.title.substring(0, 21)}
                </Text>
              </View>
            </View>
          )}
          {shopInfo.field_main_image && !isObject(shopInfo.field_main_image) && (
            <View style={{ height: 250 }}>
              <Image
                source={{ uri: shopInfo.field_main_image[0].src }}
                style={{ height: 250, resizeMode: "cover", width: "100%" }}
              />
              <LinearGradient
                // Background Linear Gradient
                colors={["transparent", "rgba(0,0,0,.7)", "rgba(0,0,0,1)"]}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 100,
                  backgroundColor: "transparent",
                }}
              />
              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: -70,
                  flexDirection: "row",
                  zIndex: 99,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.shopTextTitle, { width: "70%" }]}>
                  {shopInfo.title.substring(0, 10)}
                </Text>
                <TouchableOpacity
                  onPress={() => openGallery(shopInfo.field_main_image)}
                >
                  <ImageBackground
                    source={{ uri: shopInfo.field_main_image[1].src }}
                    imageStyle={{ borderRadius: 30 / 2, opacity: 0.7 }}
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "black",
                      borderRadius: 30 / 2,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "700",
                        fontSize: 22,
                      }}
                    >{`+${shopInfo.field_main_image.length}`}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};

{
  /* {shopInfo.field_main_image && shopInfo.field_main_image.length > 0 && (
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
                top: 250,
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
        )} */
}
export default ShopScreen;
