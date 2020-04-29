import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface PlaceProps {
    title?: string;
    description?: string;
    keyMarker?: any;
    coordinate?: any;
    image?: any;
    onPress?: () => void;
}
const Place: React.FC<PlaceProps> = ({
    title,
    description,
    keyMarker,
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
            // key={keyMarker}
            flat={false}
            tracksViewChanges={true}
            coordinate={coordinate}
        >
            <View style={styles.markerWrap} />
            <Callout
                tooltip={true}
                style={styles.box}
                onPress={onPress}
            >
                <View style={[styles.boxShadow, { justifyContent: mainImage ? "flex-start" : "center" }]}>
                    {mainImage && <Image style={{
                        width: 115,
                        height: 100,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5
                    }} source={{ uri: mainImage }} />}
                    <View style={[styles.boxText, { maxWidth: mainImage ? 170 : undefined, marginLeft: mainImage ? 10 : 0, justifyContent: mainImage ? "flex-start" : "center" }]}>
                        <Text style={{ fontFamily: "Lato-Bold", color: "white", fontSize: 18, paddingBottom: 2.5, }}>
                            {title}
                            {"\n"}
                            <Text style={{ fontSize: 10, maxWidth: mainImage ? 50 : undefined, }}>{description}</Text>
                        </Text>
                        {/* <Text style={{ fontFamily: "Lato-Regular", color: "grey", fontSize: 12, maxWidth: 300 }}>
                        </Text> */}
                    </View>
                    <MaterialCommunityIcons name="arrow-right-thick" size={20} color="white" style={{ position: "absolute", top: 10, right: 10 }} />
                </View>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Scopri di più</Text>
                </TouchableOpacity> */}
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
        width: 300,
        height: 100
    },
    box: {
        // minWidth: 250,
        flex: 1,
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#FF5A5F",
        borderWidth: 3,
        borderColor: "#D23F44",
        borderRadius: 10
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
