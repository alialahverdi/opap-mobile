import Layout from '../../../components/Layout'
import { UIManager, LayoutAnimation } from 'react-native'
import api from '../../../services/axiosInstance'
import realm from '../../../model/v1/realmInstance'
import { store } from '../../../model/query'
import CustomerCard from '../../../components/CustomerCard'
import SearchbarHeader from '../../../components/general/SearchbarHeader'


// create a component
const Customer = ({ navigation }) => {

    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [searchedCustomers, setSearchedCustomers] = useState([]);
    const [searchedCustomerText, setSearchedCustomerText] = useState("");
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
        setSearchedCustomers(newCustomers)
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

    const searchCustomer = (text) => {
        let oldSearchedCustomers = [...searchedCustomers];
        let newSearchedCustomers = oldSearchedCustomers.filter(item => {
            let itemData = item.CustomerName.toUpperCase();
            let textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setCustomers(newSearchedCustomers);
        setSearchedCustomerText(text);
    }


    return (
        <SafeAreaView>
            <SearchbarHeader text={searchedCustomerText} onChangeText={searchCustomer} />
            {customerSpinner && (
                <View style={styles.senterScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!customerSpinner && (
                <FlatList
                    style={{ paddingHorizontal: 10 }}
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
        // marginHorizontal: 10
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
