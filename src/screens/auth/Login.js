import DeviceInfo from 'react-native-device-info'
import Clipboard from '@react-native-clipboard/clipboard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import { toEnglishDigits } from '../../utils/numbersUtils'
import useSnackbar from "../../hooks/useSnackbar"
import api from '../../services/axiosInstance'
import Layout from '../../components/Layout'
import * as Animatable from 'react-native-animatable'
import FullButton from '../../components/Button/FullButton'
import { Image, Platform, ScrollView } from 'react-native'
import Ripple from 'react-native-material-ripple'
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';
import locationTracker from '../../services/locationTracker'

// BackgroundLocation

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


// Create a component
const Login = ({ navigation }) => {

    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [uniqueId, setUniqueId] = useState("");
    const [loginSpinner, setLoginSpinner] = useState(false);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        createChannel();
        setTimeout(() => {
            startBackgroundService()
        }, 2000)
        getUniqueId();
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

    const startBackgroundService = async () => {
        console.log('startBackgroundService')
        await BackgroundService.start(veryIntensiveTask, options);
    }

    const getUniqueId = () => {
        const uniqueId = DeviceInfo.getUniqueId();
        setUniqueId(uniqueId);
    }

    const copyToClipboard = () => {
        Clipboard.setString(uniqueId);
        notifyMessage("کپی شد!");
    };

    const notifyMessage = (msg) => {
        if (Platform.OS === 'android') {
            return ToastAndroid.show(msg, ToastAndroid.SHORT)
        }
        return Alert.alert(msg);
    }

    const login = async () => {
        setLoginSpinner(true)
        const params = {
            username: toEnglishDigits(username),
            password: toEnglishDigits(password),
            deviceid: uniqueId,
            version: "3.0.0"
        }

        api.post('/check', params)
            .then(res => {
                storeInStorage(res)
                console.log('res', res)
            })
            .catch(error => {
                console.log('error', error)
                showSnakbar({
                    variant: "error",
                    message: 'اطلاعات وارد شده اشتباه می باشد.'
                })
            })
            .finally(() => {
                setLoginSpinner(false)
            })
    }

    const storeInStorage = async (userInfo) => {
        const today = new Date().toLocaleDateString('fa-IR-u-nu-latn')
        userInfo.LoginDate = today
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigateToApp();
    }

    const navigateToApp = () => {
        setUsername("")
        setPassword("")
        navigation.dispatch(StackActions.replace('AppStack'));
    }

    return (
        <Layout containerStyle={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Animatable.View
                        animation="fadeInUp"
                        useNativeDriver={true}
                    >
                        <View style={styles.imgContainer}>
                            <Image
                                source={require('../../assets/img/logo.png')}
                                style={{ width: 180, height: 180 }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="نام کاربری"
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                                value={username}
                                style={styles.inputs}
                                onChangeText={setUsername}
                            />
                            <Ionicons
                                name='ios-person'
                                style={{ color: 'gray' }}
                                size={18}
                            />
                        </View>
                        <View style={styles.line} />

                        <View style={[
                            styles.inputContainer,
                            { marginTop: Platform.OS === "ios" ? 40 : 10 }
                        ]}>
                            <TextInput
                                placeholder="رمز عبور"
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                                style={styles.inputs}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <Ionicons
                                name="lock-closed"
                                style={{ color: 'gray' }}
                                size={18}
                            />
                        </View>
                        <View style={styles.line} />

                        <View style={styles.uniqueIdContainer}>
                            <TextInput
                                style={styles.textInputUniqueId}
                                editable={false}
                                value={uniqueId}
                                onChangeText={setPassword}
                            />
                            <Ripple
                                style={styles.copyButton}
                                onPress={copyToClipboard}
                            >
                                <Ionicons name="copy" size={18} color="#fff" />
                            </Ripple>
                        </View>

                        <FullButton
                            containerStyle={styles.button}
                            isLoading={loginSpinner}
                            title="ورود به حساب کاربری"
                            onPress={login}
                        />

                    </Animatable.View>
                </View>
            </ScrollView>
        </Layout>
    );
};

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        marginTop: "35%",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    imgContainer: {
        alignItems: "center",
        // backgroundColor: 'red',
        marginBottom: 20
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // marginTop: 20
    },
    inputs: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        paddingRight: 10,
        ...font.black
    },
    line: {
        backgroundColor: "#ddd",
        width: "100%",
        height: 1,
        marginTop: Platform.OS === "ios" ? 10 : 0
    },

    uniqueIdContainer: {
        flexDirection: "row",
        // backgroundColor: 'red',
        marginTop: 20
        // marginVertical: 10,
    },
    textInputUniqueId: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        color: "gray",
        // borderRadius: 5,
        textAlign: "right",
        padding: 10
    },
    copyButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6f74dd",
        paddingHorizontal: 12,
        marginLeft: 10,
        borderRadius: 5
        // backgroundColor: "red"
    },
    button: {
        // marginVertical: 10,
        marginTop: 30,
    },
});

//Make this component available to the app
export default Login;