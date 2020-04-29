import React, { useState, useEffect } from "react"
import { Text, View, Dimensions } from "react-native"

import styles from "./DashScreen.styles";

import { Header, Place } from "../../components";
import MapView from "react-native-map-clustering";
import { Geojson } from "react-native-maps";

const myPlace = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [12.2370673, 45.49809369],
            [12.23704701, 45.49805071],
            [12.23703376, 45.49803113],
            [12.23729077, 45.4979972],
            [12.23759672, 45.49798814],
            [12.23765783, 45.49799125],
            [12.23766505, 45.49802868],
            [12.23783618, 45.4980123],
            [12.23802782, 45.49799482],
            [12.23804932, 45.4980874],
            [12.23829682, 45.49806485],
            [12.23849405, 45.49803884],
            [12.23875515, 45.49801536],
            [12.2388231, 45.49802088],
            [12.23904652, 45.49799729],
            [12.23914324, 45.49799126],
            [12.23911475, 45.49786356],
            [12.23910669, 45.49782462],
            [12.23921588, 45.49780884],
            [12.2396367, 45.4977282],
            [12.23961599, 45.49768388],
            [12.23979051, 45.49763544],
            [12.24001124, 45.49755405],
            [12.24010396, 45.49752771],
            [12.24025117, 45.49751211],
            [12.24038759, 45.49747859],
            [12.24040762, 45.49751313],
            [12.24059743, 45.49744858],
            [12.24110857, 45.49731648],
            [12.24180018, 45.49707554],
            [12.24197306, 45.49702122],
            [12.24233993, 45.49688237],
            [12.24253024, 45.49681311],
            [12.24248655, 45.49676044],
            [12.24253476, 45.49674297],
            [12.24259144, 45.49673561],
            [12.24262799, 45.49679968],
            [12.24290815, 45.49671514],
            [12.24288583, 45.49667601],
            [12.24296061, 45.49664632],
            [12.24320391, 45.49655713],
            [12.24335747, 45.49650292],
            [12.24349698, 45.49643894],
            [12.24354442, 45.49642436],
            [12.24395161, 45.49628273],
            [12.24423924, 45.49665757],
            [12.24458378, 45.49712041],
            [12.2447827, 45.49742091],
            [12.24487876, 45.49738846],
            [12.24515298, 45.49724059],
            [12.24527579, 45.49735448],
            [12.24529335, 45.49737758],
            [12.24568653, 45.49720156],
            [12.24583128, 45.49717337],
            [12.24589386, 45.49725819],
            [12.24619678, 45.49716473],
            [12.24611906, 45.49698075],
            [12.24617007, 45.49695579],
            [12.24629778, 45.49688902],
            [12.24625514, 45.49678349],
            [12.24642225, 45.49672154],
            [12.2466663, 45.49697171],
            [12.24697027, 45.49681154],
            [12.24704761, 45.49677398],
            [12.24742127, 45.49658222],
            [12.24755186, 45.4965177],
            [12.24739605, 45.49633475],
            [12.2475637, 45.4962694],
            [12.2478155, 45.49616367],
            [12.24797925, 45.49609417],
            [12.2481168, 45.49603916],
            [12.24807808, 45.49599403],
            [12.24805795, 45.49600264],
            [12.24801229, 45.49594942],
            [12.24795002, 45.4958645],
            [12.24792649, 45.49583636],
            [12.2482908, 45.49569124],
            [12.24825344, 45.49561561],
            [12.24824711, 45.4955159],
            [12.24807412, 45.49528778],
            [12.24800685, 45.49523683],
            [12.24787869, 45.49507766],
            [12.24775207, 45.49512505],
            [12.24768325, 45.49503848],
            [12.24768618, 45.49495456],
            [12.24768225, 45.49490507],
            [12.24762383, 45.49486844],
            [12.24756063, 45.49482031],
            [12.24735501, 45.49456904],
            [12.24732007, 45.49449676],
            [12.24697643, 45.49410376],
            [12.24694239, 45.49405295],
            [12.24691752, 45.49394312],
            [12.24689223, 45.49357791],
            [12.24672997, 45.49336755],
            [12.24657304, 45.49315282],
            [12.2464518, 45.49299551],
            [12.24640287, 45.4930127],
            [12.24621127, 45.49277692],
            [12.24602468, 45.49251426],
            [12.24585744, 45.49236006],
            [12.24567735, 45.49218624],
            [12.24565235, 45.49214513],
            [12.24569728, 45.49212398],
            [12.24563715, 45.4920318],
            [12.24541641, 45.49143885],
            [12.24539938, 45.49141252],
            [12.24547405, 45.49138165],
            [12.24511297, 45.49081621],
            [12.24506454, 45.49083184],
            [12.24503157, 45.49078309],
            [12.24499646, 45.4907944],
            [12.2449076, 45.49066623],
            [12.24486918, 45.49063285],
            [12.24494242, 45.4906093],
            [12.24485262, 45.49047165],
            [12.24494788, 45.4904419],
            [12.24490464, 45.49037344],
            [12.24479809, 45.49020452],
            [12.24474262, 45.4901165],
            [12.24479304, 45.49010079],
            [12.2445634, 45.48972626],
            [12.2445213, 45.48973724],
            [12.24433512, 45.48949043],
            [12.24420425, 45.48953252],
            [12.24388759, 45.48964515],
            [12.24385739, 45.4896562],
            [12.24381805, 45.48958809],
            [12.24336754, 45.48971916],
            [12.24322185, 45.4897824],
            [12.24264301, 45.48997852],
            [12.24258949, 45.48999295],
            [12.24248218, 45.48977484],
            [12.24219888, 45.48982227],
            [12.24178047, 45.48990559],
            [12.24195034, 45.49018601],
            [12.24174895, 45.49024743],
            [12.24170344, 45.49030789],
            [12.24168165, 45.49031967],
            [12.24160434, 45.49034294],
            [12.24152564, 45.49037417],
            [12.24138458, 45.49040631],
            [12.24130565, 45.49042655],
            [12.24113042, 45.49050935],
            [12.24107769, 45.49051105],
            [12.24100825, 45.490422],
            [12.24083279, 45.49050495],
            [12.24054493, 45.49021646],
            [12.24055956, 45.49020824],
            [12.24048313, 45.49011798],
            [12.24053297, 45.49006344],
            [12.24027234, 45.48964698],
            [12.2402124, 45.48965457],
            [12.24008714, 45.48944582],
            [12.2400174, 45.48946672],
            [12.23970728, 45.489689],
            [12.23982671, 45.48985952],
            [12.23989069, 45.48993038],
            [12.23998711, 45.49008254],
            [12.24014101, 45.49003437],
            [12.24016485, 45.49006573],
            [12.24022821, 45.49015096],
            [12.24024369, 45.49017556],
            [12.24016996, 45.49019638],
            [12.24055513, 45.49065353],
            [12.23926362, 45.49106784],
            [12.23899135, 45.49052826],
            [12.23889305, 45.49054446],
            [12.23888042, 45.49052235],
            [12.23884082, 45.49044497],
            [12.23882817, 45.49041715],
            [12.23888799, 45.49040125],
            [12.23877275, 45.49020123],
            [12.23874611, 45.49013123],
            [12.23865211, 45.48997296],
            [12.23861594, 45.48991258],
            [12.23845299, 45.48960899],
            [12.23835644, 45.48959438],
            [12.23818959, 45.48965798],
            [12.23823273, 45.4897637],
            [12.23828658, 45.48985972],
            [12.23834334, 45.48994866],
            [12.2385922, 45.49040941],
            [12.23860787, 45.49043511],
            [12.23845298, 45.49047517],
            [12.23865373, 45.4908032],
            [12.23874194, 45.49101108],
            [12.23880271, 45.49110646],
            [12.23867789, 45.49114124],
            [12.23852798, 45.49118145],
            [12.23841446, 45.49121309],
            [12.23782721, 45.4913456],
            [12.23784639, 45.49138264],
            [12.23783169, 45.49138477],
            [12.23774164, 45.49140593],
            [12.23770931, 45.49136075],
            [12.23734167, 45.49144187],
            [12.23737265, 45.49151626],
            [12.23741222, 45.49161934],
            [12.23724597, 45.4916539],
            [12.23697359, 45.49170285],
            [12.23652665, 45.4917808],
            [12.23631375, 45.49180544],
            [12.23626814, 45.49172524],
            [12.2362549, 45.49171601],
            [12.23615014, 45.49168835],
            [12.23612558, 45.49166554],
            [12.23600995, 45.49170497],
            [12.23592229, 45.491559],
            [12.23587249, 45.49158018],
            [12.23585346, 45.49158162],
            [12.23569422, 45.49121005],
            [12.23566854, 45.49113229],
            [12.23567479, 45.49110921],
            [12.23570855, 45.49108636],
            [12.23577743, 45.49107511],
            [12.23576514, 45.49101041],
            [12.23566544, 45.49075652],
            [12.23564388, 45.49070635],
            [12.23558597, 45.49071714],
            [12.23554471, 45.49060174],
            [12.23555764, 45.49051653],
            [12.23547708, 45.49030223],
            [12.23570402, 45.49026797],
            [12.23566805, 45.49014645],
            [12.23564241, 45.49001616],
            [12.23563137, 45.48993221],
            [12.23551974, 45.48994379],
            [12.23549529, 45.4898346],
            [12.23537111, 45.4898535],
            [12.23534227, 45.48975084],
            [12.2353245, 45.48967138],
            [12.23516054, 45.48965425],
            [12.23514715, 45.48958778],
            [12.23513039, 45.48954188],
            [12.2350971, 45.48943032],
            [12.23507753, 45.48935226],
            [12.23503804, 45.48924987],
            [12.23500157, 45.48917212],
            [12.23497918, 45.48910235],
            [12.23495898, 45.48905403],
            [12.23486296, 45.4887822],
            [12.23483576, 45.48872914],
            [12.23481053, 45.48866162],
            [12.23476143, 45.48867103],
            [12.23473161, 45.48861979],
            [12.23472733, 45.48860746],
            [12.23477974, 45.48859895],
            [12.23473985, 45.48846235],
            [12.23472456, 45.48840248],
            [12.23462704, 45.48811845],
            [12.23457071, 45.48803374],
            [12.23437433, 45.48748734],
            [12.23435789, 45.48743756],
            [12.2342646, 45.48715583],
            [12.23415235, 45.48684843],
            [12.23412086, 45.48685695],
            [12.23409988, 45.48677863],
            [12.23397719, 45.48643205],
            [12.23388049, 45.48616364],
            [12.23381916, 45.48617156],
            [12.23374312, 45.48596566],
            [12.23379773, 45.48594539],
            [12.23369136, 45.48569092],
            [12.23364068, 45.48570061],
            [12.23361274, 45.48562809],
            [12.23366501, 45.48562272],
            [12.23358204, 45.48537911],
            [12.23352283, 45.48539142],
            [12.23351275, 45.48536562],
            [12.23348089, 45.48527427],
            [12.23340164, 45.48511585],
            [12.23325285, 45.48481718],
            [12.23302373, 45.48434174],
            [12.23278265, 45.48380598],
            [12.23275937, 45.48381038],
            [12.23275092, 45.48378437],
            [12.23269527, 45.48370395],
            [12.2327317, 45.48369592],
            [12.23263521, 45.48350564],
            [12.23262892, 45.48349298],
            [12.23259256, 45.48342936],
            [12.23260495, 45.4833867],
            [12.23271765, 45.48335979],
            [12.23266118, 45.48325401],
            [12.23260191, 45.48311183],
            [12.23249615, 45.48313672],
            [12.23232484, 45.48278705],
            [12.23229847, 45.48278102],
            [12.23203127, 45.48282723],
            [12.23208645, 45.4829482],
            [12.23238718, 45.48352524],
            [12.23243081, 45.4835999],
            [12.23250663, 45.48373977],
            [12.23256065, 45.48385722],
            [12.23253012, 45.4838634],
            [12.23263838, 45.48408455],
            [12.23273891, 45.4842769],
            [12.23279461, 45.48426895],
            [12.23282243, 45.48432777],
            [12.23283639, 45.48435535],
            [12.23278208, 45.48437011],
            [12.23287336, 45.48454804],
            [12.23291467, 45.48462448],
            [12.23295917, 45.4846142],
            [12.23297811, 45.48469485],
            [12.23293373, 45.48470998],
            [12.23297238, 45.48478217],
            [12.23300348, 45.48483483],
            [12.23306186, 45.48494175],
            [12.23313494, 45.48509146],
            [12.23319567, 45.48507886],
            [12.23322152, 45.48516413],
            [12.23314506, 45.48518239],
            [12.23319909, 45.48531634],
            [12.23328493, 45.48529592],
            [12.23330963, 45.48535558],
            [12.23315328, 45.48538521],
            [12.23319251, 45.48546762],
            [12.23323212, 45.48545964],
            [12.23324811, 45.4854963],
            [12.23333297, 45.48547615],
            [12.23341069, 45.48563337],
            [12.23343834, 45.48570026],
            [12.23326581, 45.48573933],
            [12.23331286, 45.48585078],
            [12.23336683, 45.48597078],
            [12.23341256, 45.4860148],
            [12.23353432, 45.48598046],
            [12.23362065, 45.48620087],
            [12.23363761, 45.4862348],
            [12.23358642, 45.48624215],
            [12.23363393, 45.4863712],
            [12.23369328, 45.48636088],
            [12.23371215, 45.48641507],
            [12.23366879, 45.48642304],
            [12.23370267, 45.4865182],
            [12.23374742, 45.48650998],
            [12.23376266, 45.48655941],
            [12.23373142, 45.48656504],
            [12.2338344, 45.48682684],
            [12.23386925, 45.48681808],
            [12.23389528, 45.48691368],
            [12.233906, 45.48694342],
            [12.23387511, 45.48694938],
            [12.23408043, 45.48741828],
            [12.23414739, 45.48760065],
            [12.23429362, 45.48804343],
            [12.23436542, 45.48802909],
            [12.23440877, 45.48815832],
            [12.23433196, 45.48817653],
            [12.23442213, 45.48836148],
            [12.23444212, 45.48842002],
            [12.23453523, 45.48867457],
            [12.23447919, 45.48868507],
            [12.2346508, 45.48914279],
            [12.23474121, 45.4894001],
            [12.23476171, 45.48946931],
            [12.23490083, 45.48946986],
            [12.23493611, 45.48955956],
            [12.23495062, 45.48956891],
            [12.23499887, 45.4897258],
            [12.23489755, 45.48974324],
            [12.2349443, 45.48992809],
            [12.23495399, 45.48994705],
            [12.23496666, 45.49004409],
            [12.23501166, 45.49020882],
            [12.23505075, 45.49020031],
            [12.23507423, 45.49023551],
            [12.23511197, 45.49038231],
            [12.23512595, 45.49043467],
            [12.23519575, 45.49042463],
            [12.23523118, 45.49055344],
            [12.2352924, 45.49054466],
            [12.23539396, 45.49080186],
            [12.23532702, 45.49081239],
            [12.23535662, 45.49088746],
            [12.23541819, 45.49104321],
            [12.23552989, 45.49133064],
            [12.23555054, 45.49138192],
            [12.2356336, 45.49162111],
            [12.23563311, 45.49168004],
            [12.23571519, 45.49188629],
            [12.23571949, 45.49188833],
            [12.23571028, 45.49188964],
            [12.23575692, 45.49205095],
            [12.23577255, 45.49226572],
            [12.2357826, 45.49246645],
            [12.23579957, 45.49255722],
            [12.23588457, 45.49267997],
            [12.23592629, 45.49269018],
            [12.23593572, 45.49294974],
            [12.23591537, 45.49318508],
            [12.23592042, 45.49346474],
            [12.23591058, 45.49381596],
            [12.23590541, 45.49398695],
            [12.23588458, 45.49398366],
            [12.2358209, 45.49415251],
            [12.23579046, 45.49428265],
            [12.23578448, 45.49438908],
            [12.23580217, 45.49453582],
            [12.23578193, 45.49482487],
            [12.23576652, 45.4951394],
            [12.23579129, 45.49514049],
            [12.23579585, 45.4951761],
            [12.23578669, 45.49529179],
            [12.23579754, 45.49541619],
            [12.23583284, 45.49540307],
            [12.2358597, 45.49547458],
            [12.23578447, 45.49547025],
            [12.23578559, 45.49559507],
            [12.23576637, 45.49566584],
            [12.2357613, 45.49583854],
            [12.23575668, 45.49603106],
            [12.23572736, 45.4960221],
            [12.23571976, 45.49604259],
            [12.23561411, 45.49604129],
            [12.23554937, 45.49618717],
            [12.23549091, 45.49633022],
            [12.23566999, 45.49636633],
            [12.2356761, 45.49635145],
            [12.23572933, 45.49636219],
            [12.2358613, 45.49636971],
            [12.23597803, 45.49649774],
            [12.23599251, 45.4965518],
            [12.23603992, 45.49669284],
            [12.23600731, 45.4968259],
            [12.23607206, 45.49694554],
            [12.23616982, 45.49702031],
            [12.23648492, 45.49764686],
            [12.2363887, 45.49766167],
            [12.23639144, 45.49777281],
            [12.23649964, 45.49801744],
            [12.23649683, 45.49807868],
            [12.23661797, 45.49807435],
            [12.23662101, 45.49819792],
            [12.23674982, 45.49819681],
            [12.23692096, 45.49819411],
            [12.23706182, 45.49818278],
            [12.23707257, 45.49814557],
            [12.2370673, 45.49809369]
          ]
        ]
      }
    }
  ]
}
const MapStyle = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }
]

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.022;
const INITIAL_REGION = {
  latitude: 45.4942,
  longitude: 12.2390,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
};

export interface Props {
  navigation: any;
}
const IntroScreen: React.FC<Props> = ({
  navigation
}) => {
  const [hasError, setErrors] = useState(false);
  const [negozi, setNegozi] = useState({});

  async function fetchData() {
    const res = await fetch("https://faicentro.it/esercenti/all/json");
    res
      .json()
      .then(res => setNegozi(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <View style={styles.dashBox}>
      <Header
        onPressFeedback={() => console.log("PressedFeedback")}
        onPressShop={() => console.log("PressedShop")}
      />
      {negozi.length > 1 && <MapView
        showsMyLocationButton={false}
        showsUserLocation={true}
        showsIndoors={true}
        showsTraffic={false}
        loadingEnabled={true}
        // provider="google"
        clusterTextColor="white"
        clusterColor="#141414"
        initialRegion={INITIAL_REGION}
        style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, }}
        customMapStyle={MapStyle}>
        <Geojson
          strokeColor="rgba(0, 0, 0, 0.55)"
          fillColor="rgba(0, 0, 0, 0.2)"
          strokeWidth={2}
          geojson={myPlace}
        />
        {negozi.map((item, key) => (
          <Place
            key={`map-marker-${item.nid}`}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
            title={item.title}
            image={item.field_main_image}
            description={item.field_address}
            onPress={() => navigation.navigate('ShopDetails', { shopID: item.nid })}
          />))
        }
      </MapView>
      }
    </View>
  )
}

export default IntroScreen
