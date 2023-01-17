import React from 'react';

import { storeObj, getPrimaryKeyId, deleteAllDataFromSchema } from '../model/query'
import DeviceInfo from 'react-native-device-info'
import { Alert } from 'react-native';
import realm from '../model/v1/realmInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Geolocation from 'react-native-geolocation-service';
import moment from "moment";
import api from './axiosInstance'
import { checkTime } from '../utils/checkTime';
import { PermissionsAndroid } from "react-native";
import BackgroundService from 'react-native-background-actions';


export const checkLocationIsOn = async () => {
    const enabled = await DeviceInfo.isLocationEnabled()
    return enabled ?? false
}

export const getLatestLocation = async () => {

    // let location = null;

    // RNLocation.getLatestLocation()
    //     .then(latestLocation => {
    //         // Use the location here
    //         console.log('latestLocation', latestLocation)
    //         location = latestLocation
    //     })
    // return location
}

const addToDB = async (latestLocation) => {
    if (latestLocation === undefined) return

    const timestamp = Date.now()
    const value = await AsyncStorage.getItem("userInfo")
    const userInfo = JSON.parse(value)

    const locationObj = {
        Latitude: latestLocation.latitude.toString(),
        Longitude: latestLocation.longitude.toString(),
        TrackDate: moment(timestamp).format("YYYY-MM-DD").toString(),
        TrackTime: moment(timestamp).format("HH:mm:ss").toString(),
        TrackTimeStamp: Date.now()
    }

    storeObj(locationObj, "Location").then(async (res) => {

        const realmLocatinos = realm.objects("Location")
        const locations = JSON.parse(JSON.stringify(realmLocatinos))

        if (userInfo === null) return

        api.post('/tracker/add', locations).then(res => {
            deleteAllDataFromSchema("Location")
        }).catch(error => {
            AsyncStorage.setItem("errorLocationApi", JSON.stringify(error))
        })

    })
}

const getCurrentLocation = async () => {
    const enabled = await checkLocationIsOn()
    if (!enabled) {
        return Alert.alert('لوکیشن شما خاموش است لطفا آن را روشن کنید.')
    }
    Geolocation.getCurrentPosition(
        (position) => {
            addToDB(position.coords)
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

const locationTracker = async () => {

    const validTime = checkTime()

    if (!validTime) {
        BackgroundService.stop();
        return
    }


    const value = await AsyncStorage.getItem("permission")
    const permission = JSON.parse(value)

    if (permission === null) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            if (granted) {
                await AsyncStorage.setItem("permission", "true")
                getCurrentLocation()
            }
        }
    } else {
        getCurrentLocation()
    }
}

export default locationTracker