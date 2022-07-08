import DeviceInfo from 'react-native-device-info'
import Clipboard from '@react-native-clipboard/clipboard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import { toEnglishDigits } from '../../utils/numbersUtils'
import useSnackbar from "../../hooks/useSnackbar"
import api from '../../services/axiosInstance';

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
        getUniqueId();
    }, [])

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
            version: "1.0.0"
        }

        let response = await fetch(
            `http://94.182.208.37:9922/check`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            },
        );
        let json = await response.json()
        if (json.code == 0) {
            storeInStorage(json)
        } else {
            showSnakbar({ variant: "error", message: json.message })
        }
        setLoginSpinner(false)

        // api.post('/check', params)
        //     .then(res => {
        //         storeInStorage(res)
        //     })
        //     .catch(error => {
        //         showSnakbar({ variant: "error", message: error.message })
        //     })
        //     .finally(() => {
        //         setLoginSpinner(false)
        //     })
    }

    const storeInStorage = async (userInfo) => {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigateToApp();
    }

    const navigateToApp = () => {
        setUsername("");
        setPassword("");
        navigation.dispatch(StackActions.replace('AppStack'));
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="نام کاربری"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.textInput}
                placeholder="رمز عبور"
                keyboardType="numeric"
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.uniqueIdContainer}>
                <TextInput
                    style={styles.textInputUniqueId}
                    editable={false}
                    value={uniqueId}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    activeOpacity={.6}
                    style={styles.copyButton}
                    onPress={copyToClipboard}
                >
                    <Ionicons name="copy" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={.6}
                style={styles.button}
                onPress={login}
            >
                {
                    loginSpinner
                        ? <ActivityIndicator size="small" color="#fff" />
                        : <Text style={font.white}>ورود به حساب کاربری</Text>
                }
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    textInput: {
        ...font.gray,
        height: 40,
        marginVertical: 10,
        borderWidth: .5,
        borderColor: "gray",
        padding: 10,
        textAlign: "right",
        borderRadius: 5,
    },
    uniqueIdContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    textInputUniqueId: {
        flex: 1,
        height: 40,
        borderWidth: .5,
        borderColor: "gray",
        borderRadius: 5,
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6f74dd",
        marginVertical: 10,
        height: 40,
        borderRadius: 5
    },
});

//Make this component available to the app
export default Login;