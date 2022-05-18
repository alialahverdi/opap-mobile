import DeviceInfo from 'react-native-device-info'

const Login = () => {

    // States
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [uniqueId, setUniqueId] = useState(null);

    // Logic or Functions
    const getUniqueId = () => {
        const uniqueId = DeviceInfo.getUniqueId();
        setUniqueId(uniqueId);
    }

    useEffect(() => {
        getUniqueId();
    }, [])

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
            <TextInput
                style={styles.textInput}
                onChangeText={setPassword}
                value={uniqueId}
                editable={false}
            />
            <TouchableOpacity activeOpacity={.6} style={styles.button}>
                <Text>ورود به حساب کاربری</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
    }
});

export default Login;