import { Dimensions } from 'react-native'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable'
import Layout from '../../components/Layout'
import { Image } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import useSnackbar from "../../hooks/useSnackbar"
import Button from '../../components/Button'
import Ripple from 'react-native-material-ripple'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


// Create a component
const Splash = ({ navigation }) => {

    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [spinner, setSpinner] = useState(false);
    const [showTryAgain, setShowTryAgain] = useState(false);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        checkLocationIsOn()
    }, [])

    const checkLocationIsOn = () => {
        DeviceInfo.isLocationEnabled().then((enabled) => {
            if (enabled) {
                getUserInfo()
            } else {
                setShowTryAgain(true)
                Alert.alert('لوکیشن شما خاموش است لطفا آن را روشن کنید.')
                // showSnakbar({
                //     variant: "error",
                //     message: 'لوکیشن شما خاموش است لطفا آن را روشن کنید.'
                // })
            }
        });
    }

    const getUserInfo = async () => {
        const value = await AsyncStorage.getItem("userInfo")
        const userInfo = JSON.parse(value)
        checkLogin(userInfo)
    }

    const checkLogin = (userInfo) => {
        const today = new Date().toLocaleDateString('fa-IR-u-nu-latn')
        setTimeout(() => {
            if (userInfo !== null && userInfo.LoginDate === today) {
                navigation.dispatch(StackActions.replace("AppStack"));
            } else {
                navigation.dispatch(StackActions.replace("AuthStack"));
            }
            setSpinner(false)
        }, 1000)
    }

    const zoomOut = {
        0: {
            opacity: 0
        },
        0.5: {
            opacity: .5,
            scale: 1.2,
        },
        1: {
            opacity: 1,
            scale: 1,
        },
    };

    const tryAgain = () => {
        setSpinner(true)
        DeviceInfo.isLocationEnabled().then((enabled) => {
            if (enabled) {
                getUserInfo()
            } else {
                setSpinner(false)
                showSnakbar({
                    variant: "error",
                    message: 'لوکیشن شما خاموش است لطفا آن را روشن کنید.'
                })
            }
        });
    }


    return (
        <Layout containerStyle={styles.container}>
            <View style={styles.up} />
            <View style={styles.down}>
                <Animatable.View
                    animation={zoomOut}
                    duration={2000}
                    useNativeDriver={true}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/img/logo.png')}
                        style={{ width: 180, height: 180 }}
                    />
                </Animatable.View>
                {showTryAgain && (
                    <Ripple
                        style={styles.tryAgain}
                        onPress={tryAgain}
                    >
                        {
                            spinner
                                ? <ActivityIndicator size="small" color="#DADADA" />
                                : <Text style={styles.version}>تلاش مجدد</Text>
                        }
                    </Ripple>
                )}
                <Text style={styles.version}>Version : 2.0.0</Text>
            </View>
        </Layout>
    )
}

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: themeColor.primary,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    up: {
        flex: .3
    },
    down: {
        flex: .7,
        justifyContent: 'space-between',
        alignItems: 'center'
        // backgroundColor: 'red'
    },
    appName: {
        // ...font.whiteBold,
        fontSize: 25
    },
    tryAgain: {
        width: 100,
        height: 35,
        borderWidth: 1,
        borderColor: '#DADADA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    version: {
        fontSize: 11,
        marginBottom: "1%",
        ...font.gray
    }
})

//Make this component available to the app
export default Splash
