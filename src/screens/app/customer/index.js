import api from '../../../services/axiosInstance';
import realm from '../../../database/v1/realmInstance';
import { store } from '../../../database/query';
import { Button } from 'react-native';
// create a component
const Customer = ({ navigation }) => {

    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(false);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        // getRealmCustomers();
    }, [])

    const getRealmCustomers = () => {
        const realmCustomers = realm.objects('Customer');
        if (realmCustomers.length > 0) return;
        getApiCustomers();
    }

    const getApiCustomers = () => {
        api.get('/customer/get')
            .then(res => {
                store(res.content, "Customer")
            })
            .catch(() => { })
    }

    return (
        <View style={styles.container}>
            <Text>Customer Screen</Text>
            <Button title='Button' onPress={getRealmCustomers} />
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
})

//make this component available to the app
export default Customer
