import { StyleSheet } from "react-native";

export default StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
  shopBox: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  shopBoxText: {
    backgroundColor: "black",
    // marginBottom: 20, 
  },
  imageLogo: {
    width: 276,
    height: 173,
    resizeMode: "contain",
    tintColor: "white"
  },
  shopText: {
    // fontFamily: "Lato-Regular",
    color: "white",
    fontSize: 20,
  },
  shopTextCategorie: {
    // fontFamily: "Lato-Bold",
    color: "gray",
    fontSize: 14,
  },
  shopTextTitle: {
    // fontFamily: "Lato-Bold",
    color: "white",
    fontSize: 32,
    fontWeight: "700"
  },
  shopTextAddress: {
    // fontFamily: "Lato-Bold",
    color: "lightgray",
    fontSize: 17,
  },
  shopTextInfos: {
    marginVertical: 20,
    // fontFamily: "Lato-Regular",
    color: "white",
    fontSize: 14,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "#e8e9ef",
    borderRadius: 40 / 2,
  },
});
