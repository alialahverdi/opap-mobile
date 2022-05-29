import { UIManager, LayoutAnimation } from 'react-native';
import api from '../../../services/axiosInstance';
import realm from '../../../model/v1/realmInstance';
import { store } from '../../../model/query';
import CustomerCard from '../../../components/CustomerCard';


// create a component
const Customer = ({ navigation }) => {

    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [prevIndex, setPrevIndex] = useState([]);

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        getRealmCustomers();
    }, [])

    const getRealmCustomers = () => {
        const realmCustomers = realm.objects('Customer');
        const customers = realmCustomers.toJSON();
        if (realmCustomers.length > 0) {
            return addExpandable(customers)
        };
        getApiCustomers();
    }

    const getApiCustomers = () => {
        api.get('/customer/get').then(res => {
            store(res.content, "Customer").then(() => {
                addExpandable(res.content)
            })
        }).catch(() => { })
    }

    const addExpandable = (customers) => {
        const newCustomers = customers.map(item => {
            return {
                ...item,
                layoutHeight: 0
            }
        })
        setCustomers(newCustomers);
        setCustomerSpinner(false);
    }

    const showCustomers = ({ item, index }) => {
        return (
            <CustomerCard
                customer={item}
                onExpand={() => openLayoutCustomer(index)}
            />
        )
    }

    const openLayoutCustomer = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const customersCloned = [...customers];
        if (prevIndex.includes(index)) {
            customersCloned[index].layoutHeight = 0;
            setCustomers(customersCloned)
            setPrevIndex([])
        } else {
            let newCustomers = customersCloned.map(item => {
                return {
                    ...item,
                    layoutHeight: 0,
                }
            })
            newCustomers[index].layoutHeight == 0
                ? newCustomers[index].layoutHeight = null
                : newCustomers[index].layoutHeight = 0;
            setCustomers(newCustomers)
            setPrevIndex([index])
        }
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
