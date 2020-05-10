import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface PlaceProps {
    title?: string;
    description?: string;
    coordinate?: any;
    image?: any;
    onPress?: () => void;
}
const Place: React.FC<PlaceProps> = ({
    title,
    description,
    coordinate,
    image,
    onPress
}) => {
    const [mainImage, setmainImage] = useState();
    const getImage = () => {
        if (image) {
            if (image.length > 1) {
                image.map((item, key) => {
                    if (key < 1) {
                        if (item.src) {
                            setmainImage(item.src)
                        }
                    }
                })
            }
        }
    }
    useEffect(() => {
        getImage()
    }, [])
    return (
        <Marker
            flat={false}
            tracksViewChanges={true}
            coordinate={coordinate}
            pinColor={"#141414"}
        >
            <Callout
                tooltip={false}
                style={!mainImage ? styles.box : {}}
                onPress={onPress}
            >
                <View style={[styles.boxShadow, { justifyContent: mainImage ? "flex-start" : "center" }]}>
                    {mainImage && <Image style={{
                        width: 125,
                        height: 125,
                        borderRadius: 70
                    }} source={{ uri: mainImage }} />}
                    <View style={[styles.boxText, { maxWidth: mainImage ? 170 : undefined, marginLeft: mainImage ? 10 : 0, justifyContent: mainImage ? "flex-start" : "center" }]}>
                        <Text style={{ fontFamily: "Lato-Bold", color: "black", fontSize: 18, paddingBottom: 2.5, }}>
                            {title}
                            {"\n"}
                            <Text style={{ fontSize: 8.5, maxWidth: mainImage ? 50 : undefined, }}>{description}</Text>
                        </Text>
                    </View>
                    <MaterialCommunityIcons name="arrow-right-thick" size={20} color="black" style={!mainImage ? {} : { position: "absolute", top: mainImage ? 10 : 20, right: 0 }} />
                </View>
            </Callout>
        </Marker>
    );
};


export default Place;

const styles = StyleSheet.create({
    boxShadow: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
    },
    box: {
        minWidth: 250,
    },
    boxText: {
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center"
    },
    markerWrap: {
        backgroundColor: '#FF5A5F',
        padding: 10,
        borderRadius: 20,
        borderColor: '#D23F44',
        borderWidth: 3,
    }
});
