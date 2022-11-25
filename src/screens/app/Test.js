import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';

const TestScreen = () => {

    useEffect(() => {
        // checkPermission()
    }, [])

    const checkPermission = async () => {
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
        let locationSubscription = null;
        let locationTimeout = null;

        ReactNativeForegroundService.add_task(() => {
            RNLocation.requestPermission({
                ios: 'whenInUse',
                android: {
                    detail: 'fine',
                },
            }).then((granted) => {
                console.log('Location Permissions: => ', granted);
                // if has permissions try to obtain location with RN location
                if (granted) {
                    console.log('befor ', granted);
                    locationSubscription && locationSubscription();
                    locationSubscription = RNLocation.subscribeToLocationUpdates(
                        ([locations]) => {
                            locationSubscription();
                            locationTimeout && clearTimeout(locationTimeout);
                            console.log(locations);
                        },
                    );
                } else {
                    locationSubscription && locationSubscription();
                    locationTimeout && clearTimeout(locationTimeout);
                    // console.log('no permissions to obtain location');
                }
            });
        }, {
            delay: 1000,
            onLoop: true,
            taskId: 'taskid',
            onError: (e) => console.log('Error logging:', e),
        });
    }

    const stopTask = () => {
        ReactNativeForegroundService.stop();
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
                    console.log('latestLocation', latestLocation)
                })
        })


    }

    return (
        <View>
            <Text>TestScreen</Text>
            <Text onPress={() => stopTask()}>stop</Text>
            <Text onPress={() => getCurrentLocation()}>getCurrentLocation</Text>
        </View>
    )
}

export default TestScreen