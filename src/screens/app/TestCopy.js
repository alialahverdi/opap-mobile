import React, { useEffect, useState } from "react";
import {
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    PermissionsAndroid
} from "react-native";
import { useIsFocused } from '@react-navigation/native'
import realm from '../../model/v1/realmInstance'
import moment from "moment";
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Ripple from "react-native-material-ripple";
import BackgroundService from 'react-native-background-actions';
import locationTracker from "../../services/locationTracker";


const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            locationTracker()
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'Opap',
    taskDesc: 'Opap is runnig',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 4000,
    },
};




const Test = () => {

    // const isFocused = useIsFocused()

    // const [location, setLocation] = useState(null)
    // const [allLocations, setAllLocations] = useState([])

    // useEffect(() => {
    //     getLocation()
    // }, [isFocused])

    // const getLocation = () => {
    //     const realmLocatinos = realm.objects("Location")
    //     const locations = JSON.parse(JSON.stringify(realmLocatinos))
    //     setAllLocations(locations)
    // }

    useEffect(() => {
        createChannel()
    }, [])


    const createChannel = async () => {
        const channelConfig = {
            id: 'channelId',
            name: 'Channel name',
            description: 'Channel description',
            enableVibration: false
        };
        await VIForegroundService.getInstance().createNotificationChannel(channelConfig);
    }

    const startForegroundService = async () => {
        const notificationConfig = {
            channelId: 'channelId',
            id: 3456,
            title: 'Title',
            text: 'Some text',
            icon: 'ic_icon',
            button: 'Some text',
        };
        try {
            await VIForegroundService.getInstance().startService(notificationConfig);
        } catch (e) {
            console.error(e);
        }
    }

    const stopForegroundService = async () => {
        await VIForegroundService.getInstance().stopService();
    }


    const startBackgroundService = async () => {
        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({ taskDesc: 'My counter is runnig' });
    }

    const stopBackgroundService = async () => {
        await BackgroundService.stop();
    }


    return (
        <ScrollView style={styles.container}>
            {/* <Ripple onPress={startForegroundService}>
                <Text>startForegroundService</Text>
            </Ripple>
            <Ripple onPress={stopForegroundService}>
                <Text>stopForegroundService</Text>
            </Ripple> */}

            <Ripple onPress={startBackgroundService}>
                <Text>startBackgroundService</Text>
            </Ripple>
            <Ripple onPress={stopBackgroundService}>
                <Text>stopBackgroundService</Text>
            </Ripple>
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