import React from 'react';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
import { storeObj, getPrimaryKeyId } from '../model/query'
import DeviceInfo from 'react-native-device-info'
import { Alert } from 'react-native';


export const checkLocationIsOn = async () => {
    const enabled = await DeviceInfo.isLocationEnabled()
    return enabled ?? false
}

export const getLatestLocation = async () => {

    let location = null;

    RNLocation.getLatestLocation()
        .then(latestLocation => {
            // Use the location here
            console.log('latestLocation', latestLocation)
            location = latestLocation
        })
    return location
}

const getCurrentLocation = () => {
    RNLocation.configure({
        distanceFilter: 100, // Meters
        desiredAccuracy: {
            ios: 'best',
            android: 'balancedPowerAccuracy',
        },
        // Android only
        androidProvider: 'auto',
        interval: 5000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        // iOS Only
        activityType: 'other',
        allowsBackgroundLocationUpdates: false,
        headingFilter: 1, // Degrees
        headingOrientation: 'portrait',
        pausesLocationUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: false,
    });
    RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
            detail: 'fine',
        },
    }).then((granted) => {
        console.log('granted', granted)
        RNLocation.getLatestLocation({ timeout: 60000 })
            .then(latestLocation => {
                // Use the location here
                AddToDB(latestLocation)
            })
    })
}

const AddToDB = (latestLocation) => {
    const locationObj = {
        ID: getPrimaryKeyId("Location"),
        Lat: latestLocation.latitude.toString(),
        Long: latestLocation.longitude.toString(),
        Date: new Date().toString(),
        TimeStamp: Date.now()
    }
    storeObj(locationObj, "Location").then(res => { })
}

const locationTracker = async () => {
    RNLocation.configure({
        distanceFilter: 0.5, // Meters
        desiredAccuracy: {
            ios: 'best',
            android: 'balancedPowerAccuracy',
        },
        // Android only
        androidProvider: 'auto',
        interval: 5000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        // iOS Only
        activityType: 'other',
        allowsBackgroundLocationUpdates: false,
        headingFilter: 1, // Degrees
        headingOrientation: 'portrait',
        pausesLocationUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: false,
    });

    RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
            detail: "fine",
            rationale: {
                title: "Location permission",
                message: "We use your location to demo the library",
                buttonPositive: "OK",
                buttonNegative: "Cancel"
            }
        }
    }).then(async (granted) => {
        const enabled = await checkLocationIsOn()
        if (!enabled) {
            return Alert.alert('لوکیشن شما خاموش است لطفا آن را روشن کنید.')
        }
        if (granted) {
            RNLocation.subscribeToLocationUpdates(
                locations => {
                    AddToDB(locations[0])
                }
            );
        }
    });


    // RNLocation.configure({
    //     distanceFilter: 100, // Meters
    //     desiredAccuracy: {
    //         ios: 'best',
    //         android: 'balancedPowerAccuracy',
    //     },
    //     // Android only
    //     androidProvider: 'auto',
    //     interval: 5000, // Milliseconds
    //     fastestInterval: 10000, // Milliseconds
    //     maxWaitTime: 5000, // Milliseconds
    //     // iOS Only
    //     activityType: 'other',
    //     allowsBackgroundLocationUpdates: false,
    //     headingFilter: 1, // Degrees
    //     headingOrientation: 'portrait',
    //     pausesLocationUpdatesAutomatically: false,
    //     showsBackgroundLocationIndicator: false,
    // });
    // let locationSubscription = null;
    // let locationTimeout = null;

    // ReactNativeForegroundService.add_task(() => {
    //     RNLocation.requestPermission({
    //         ios: 'whenInUse',
    //         android: {
    //             detail: 'fine',
    //         },
    //     }).then((granted) => {
    //         console.log('Location Permissions: => ', granted);
    //         // if has permissions try to obtain location with RN location
    //         if (granted) {
    //             locationSubscription && locationSubscription();
    //             locationSubscription = RNLocation.subscribeToLocationUpdates(
    //                 ([locations]) => {
    //                     locationSubscription();
    //                     locationTimeout && clearTimeout(locationTimeout);
    //                     console.log(locations);
    //                 },
    //             );
    //         } else {
    //             locationSubscription && locationSubscription();
    //             locationTimeout && clearTimeout(locationTimeout);
    //             // console.log('no permissions to obtain location');
    //         }
    //     });
    // }, {
    //     delay: 1000,
    //     onLoop: true,
    //     taskId: 'taskid',
    //     onError: (e) => console.log('Error logging:', e),
    // });

}

export default locationTracker