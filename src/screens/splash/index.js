import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';


// Create a component
const Splash = ({ navigation }) => {

    // ------- States ------- //

    const [spinner, setSpinner] = useState(true);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const value = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(value);
        checkLogin(userInfo);
    }

    const checkLogin = (userInfo) => {
        setTimeout(() => {
            if (userInfo != null) {
                navigation.dispatch(StackActions.replace('AppStack'));
            } else {
                navigation.dispatch(StackActions.replace('AuthStack'));
            }
            setSpinner(false);
        }, 1000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ marginBottom: 20 }}>Splash Screen</Text>
            {spinner && <ActivityIndicator size="small" color="#6f74dd" />}
        </SafeAreaView>
    )
}

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
})

//Make this component available to the app
export default Splash
