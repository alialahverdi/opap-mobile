import React, { useEffect, useState } from "react";
import {
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import RNLocation from "react-native-location";
import { useIsFocused } from '@react-navigation/native'
import realm from '../../model/v1/realmInstance'
import moment from "moment";

const repoUrl = "https://github.com/timfpark/react-native-location";

// export default class App extends React.PureComponent {
//     constructor() {
//         super();
//         this.state = {
//             location: null
//         };
//     }

//     componentDidMount() {
//         RNLocation.configure({
//             distanceFilter: 5.0
//         });

//         RNLocation.requestPermission({
//             ios: "whenInUse",
//             android: {
//                 detail: "fine",
//                 rationale: {
//                     title: "Location permission",
//                     message: "We use your location to demo the library",
//                     buttonPositive: "OK",
//                     buttonNegative: "Cancel"
//                 }
//             }
//         }).then(granted => {
//             if (granted) {
//                 // this._startUpdatingLocation();
//                 RNLocation.subscribeToLocationUpdates(
//                     locations => {
//                         console.log(locations[0])
//                         this.setState({ location: locations[0] });
//                     }
//                 );
//             }
//         });
//     }

//     _startUpdatingLocation = () => {
//         RNLocation.subscribeToLocationUpdates(
//             locations => {
//                 console.log(locations[0])
//                 this.setState({ location: locations[0] });
//             }
//         );
//     };

//     _stopUpdatingLocation = () => {
//         this.locationSubscription && this.locationSubscription();
//         this.setState({ location: null });
//     };

//     render() {
//         const { location } = this.state;
//         return (
//             <ScrollView style={styles.container}>
//                 <SafeAreaView style={styles.innerContainer}>
//                     <View style={{ alignItems: "center", marginTop: 30 }}>
//                         <Text style={styles.title}>react-native-location</Text>
//                     </View>

//                     <View style={styles.row}>
//                         <TouchableHighlight
//                             onPress={this._startUpdatingLocation}
//                             style={[styles.button, { backgroundColor: "#126312" }]}
//                         >
//                             <Text style={styles.buttonText}>Start</Text>
//                         </TouchableHighlight>

//                         <TouchableHighlight
//                             onPress={this._stopUpdatingLocation}
//                             style={[styles.button, { backgroundColor: "#881717" }]}
//                         >
//                             <Text style={styles.buttonText}>Stop</Text>
//                         </TouchableHighlight>
//                     </View>

//                     {location && (
//                         <React.Fragment>
//                             <View style={styles.row}>
//                                 <View style={[styles.detailBox, styles.third]}>
//                                     <Text style={styles.valueTitle}>Course</Text>
//                                     <Text style={[styles.detail, styles.largeDetail]}>
//                                         {location.course}
//                                     </Text>
//                                 </View>

//                                 <View style={[styles.detailBox, styles.third]}>
//                                     <Text style={styles.valueTitle}>Speed</Text>
//                                     <Text style={[styles.detail, styles.largeDetail]}>
//                                         {location.speed}
//                                     </Text>
//                                 </View>

//                                 <View style={[styles.detailBox, styles.third]}>
//                                     <Text style={styles.valueTitle}>Altitude</Text>
//                                     <Text style={[styles.detail, styles.largeDetail]}>
//                                         {location.altitude}
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={{ alignItems: "flex-start" }}>
//                                 <View style={styles.row}>
//                                     <View style={[styles.detailBox, styles.half]}>
//                                         <Text style={styles.valueTitle}>Latitude</Text>
//                                         <Text style={styles.detail}>{location.latitude}</Text>
//                                     </View>

//                                     <View style={[styles.detailBox, styles.half]}>
//                                         <Text style={styles.valueTitle}>Longitude</Text>
//                                         <Text style={styles.detail}>{location.longitude}</Text>
//                                     </View>
//                                 </View>

//                                 <View style={styles.row}>
//                                     <View style={[styles.detailBox, styles.half]}>
//                                         <Text style={styles.valueTitle}>Accuracy</Text>
//                                         <Text style={styles.detail}>{location.accuracy}</Text>
//                                     </View>

//                                     <View style={[styles.detailBox, styles.half]}>
//                                         <Text style={styles.valueTitle}>Altitude Accuracy</Text>
//                                         <Text style={styles.detail}>
//                                             {location.altitudeAccuracy}
//                                         </Text>
//                                     </View>
//                                 </View>

//                                 <View style={styles.row}>
//                                     <View style={[styles.detailBox, styles.half]}>
//                                         <Text style={styles.valueTitle}>Timestamp</Text>
//                                         <Text style={styles.detail}>{location.timestamp}</Text>
//                                     </View>

//                                     <View style={[styles.detailBox, styles.half]}>
//                                         <Text style={styles.valueTitle}>Date / Time</Text>
//                                         <Text style={styles.detail}>
//                                             {/* {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")} */}
//                                         </Text>
//                                     </View>
//                                 </View>

//                                 <View style={styles.row}>
//                                     <View style={[styles.detailBox, styles.full]}>
//                                         <Text style={styles.json}>{JSON.stringify(location)}</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </React.Fragment>
//                     )}
//                 </SafeAreaView>
//             </ScrollView>
//         );
//     }
// }


const Test = () => {

    const isFocused = useIsFocused()

    const [location, setLocation] = useState(null)
    const [allLocations, setAllLocations] = useState([])

    useEffect(() => {


    }, [isFocused])


    return (
        <ScrollView style={styles.container}>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#E0DEDE',
        // marginVertical: 3
    },
    container: {
        flex: 1,
        backgroundColor: "#CCCCCC"
    },
    innerContainer: {
        marginVertical: 30
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    repoLink: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold",
        color: "#0000CC",
        textDecorationLine: "underline"
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 5
    },
    detailBox: {
        padding: 15,
        justifyContent: "center"
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    buttonText: {
        fontSize: 30,
        color: "#FFFFFF"
    },
    valueTitle: {
        fontFamily: "Futura",
        fontSize: 12
    },
    detail: {
        fontSize: 15,
        fontWeight: "bold"
    },
    largeDetail: {
        fontSize: 20
    },
    json: {
        fontSize: 12,
        fontFamily: "Courier",
        textAlign: "center",
        fontWeight: "bold"
    },
    full: {
        width: "100%"
    },
    half: {
        width: "50%"
    },
    third: {
        width: "33%"
    }
});

export default Test