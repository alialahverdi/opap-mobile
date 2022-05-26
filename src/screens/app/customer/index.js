import api from '../../../services/axiosInstance';
import realm from '../../../database/v1/realmInstance';
import { store } from '../../../database/query';
import { Button } from 'react-native';
// create a component
const Customer = ({ navigation }) => {

    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(true);
    const [customers, setCustomers] = useState([]);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmCustomers();
    }, [])

    const getRealmCustomers = () => {
        const realmCustomers = realm.objects('Customer');
        if (realmCustomers.length > 0) {
            setCustomers(realmCustomers);
            setCustomerSpinner(false);
            return;
        };
        getApiCustomers();
    }

    const getApiCustomers = () => {
        api.get('/customer/get').then(res => {
            store(res.content, "Customer").then(() => {
                setCustomers(realmCustomers);
                setCustomerSpinner(false);
            })
        }).catch(() => { })
    }

    const showCustomers = ({ item, index }) => {
        return (
            <View>
                <Text>{item.CustomerName}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {customerSpinner && (
                <View style={styles.senterScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!customerSpinner && (
                <FlatList
                    data={customers}
                    renderItem={showCustomers}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}

        </SafeAreaView>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    senterScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
})

//make this component available to the app
export default Customer
