import { Dimensions } from 'react-native'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable'
import Layout from '../../components/Layout'
import { Image } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


// Create a component
const Splash = ({ navigation }) => {

    // ------- States ------- //
    const [spinner, setSpinner] = useState(true);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getUserInfo()
    }, [])

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


    return (
        <Layout containerStyle={styles.container}>
            <View />
            <Animatable.View
                animation={zoomOut}
                duration={2000}
                useNativeDriver={true}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/img/logo.png')}
                    style={{ width: 180, height: 180 }}
                />
                <Text style={styles.appName}>Opap</Text>
            </Animatable.View>
            <Text style={styles.version}>Version : 0.1.0</Text>
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
    appName: {
        ...font.whiteBold,
        fontSize: 25
    },
    version: {
        color: '#fff',
        fontSize: 11,
        marginBottom: "1%"
    }
})

//Make this component available to the app
export default Splash
