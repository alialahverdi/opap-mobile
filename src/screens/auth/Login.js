import DeviceInfo from 'react-native-device-info';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

import api from '../../services/axiosInstance';

// Create a component
const Login = ({ navigation }) => {

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
        setLoginSpinner(true);
        const params = {
            username,
            password,
            deviceid: uniqueId,
            version: "1.0.0"
        }
        api.post('/check', params)
            .then(res => {
                storeInStorage(res);
            })
            .catch(() => { })
            .finally(() => {
                setLoginSpinner(false);
            })
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
        <SafeAreaView>
            <TextInput
                style={styles.textInput}
                onChangeText={setUsername}
                placeholder="نام کاربری"
                value={username}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
                placeholder="رمز عبور"
                keyboardType="numeric"
            />
            <View style={styles.uniqueIdContainer}>
                <TextInput
                    style={styles.textInputUniqueId}
                    onChangeText={setPassword}
                    value={uniqueId}
                    editable={false}
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
                        : <Text style={{ color: "#fff" }}>ورود به حساب کاربری</Text>
                }
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// Define your styles
const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: .5,
        padding: 10,
        textAlign: "right",
        borderRadius: 5
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6f74dd",
        margin: 12,
        height: 40,
        borderRadius: 5
    },
    uniqueIdContainer: {
        flexDirection: "row",
        margin: 12,
    },
    textInputUniqueId: {
        flex: 1,
        height: 40,
        borderWidth: .5,
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
    }
});

//Make this component available to the app
export default Login;