import Layout from '../../../components/layout'
import { UIManager, LayoutAnimation } from 'react-native'
import api from '../../../services/axiosInstance'
import realm from '../../../model/v1/realmInstance'
import { storeArray, storeObj } from '../../../model/query'
import CustomerCard from '../../../components/CustomerCard'
import SearchbarHeader from '../../../components/general/SearchbarHeader'
import { toEnglishDigits } from '../../../utils/numbersUtils'
import { generatorID } from '../../../utils/IDUtils'




// create a component
const Customer = ({ navigation }) => {

    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(true)
    const [customers, setCustomers] = useState([])
    const [searchedCustomers, setSearchedCustomers] = useState([])
    const [searchedCustomerText, setSearchedCustomerText] = useState("")
    const [prevIndex, setPrevIndex] = useState([])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        getRealmCustomers()
    }, [])

    const getRealmCustomers = () => {
        const realmCustomers = realm.objects('Customer')
        const customers = realmCustomers.toJSON()
        if (realmCustomers.length > 0) {
            return addExpandable(customers)
        };
        getApiCustomers()
    }

    const getApiCustomers = () => {
        api.get('/customer/get').then(res => {
            storeArray(res.content, "Customer").then(() => {
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
        setCustomers(newCustomers)
        setSearchedCustomers(newCustomers)
        setCustomerSpinner(false)
    }

    const showCustomers = ({ item, index }) => {
        return (
            <CustomerCard
                customer={item}
                onExpand={() => openLayoutCustomer(index)}
                onOrder={() => onOrder(item)}
            />
        )
    }

    const openLayoutCustomer = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        const customersCloned = [...customers]
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

    const getPreviousOrders = (customer) => {
        const realmOrders = realm.objects("Order").filtered(`CustomerID == ${customer.CustomerID}`)
        const ordersEncoded = realmOrders.toJSON()
        return ordersEncoded
    }

    const onOrder = (customer) => {
        const previousOrders = getPreviousOrders(customer)
        if (previousOrders.length > 0) {
            return navigateToOrderScreen(previousOrders[0])
        } else {
            storeOrder(customer)
        }
    }

    const storeOrder = (customer) => {
        const orderObj = {
            OrderID: generatorID(),
            CustomerID: customer.CustomerID,
            CustomerName: customer.CustomerName,
            Created_at: new Date().toString()
        }
        console.log('new Date().toString()', new Date().toString())
        storeObj(orderObj, "Order").then(res => {
            navigateToOrderScreen(res.toJSON())
        })
    }

    const navigateToOrderScreen = (customer) => {
        navigation.navigate('OrderStack', {
            screen: 'OrderedProducts',
            params: { customer }
        });
    }

    const searchCustomer = (text) => {
        const oldSearchedCustomers = [...searchedCustomers]
        const newSearchedCustomers = oldSearchedCustomers.filter(item => {
            // return item.CustomerName.toLowerCase().match(text)
            return contains(item, text)
        });
        setCustomers(newSearchedCustomers)
        setSearchedCustomerText(text)
    }

    const contains = (item, query) => {
        const { CustomerName, CustomerID } = item;
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            CustomerName.includes(query) ||
            CustomerID.toString().includes(formattedQuery)
        ) return true
        return false
    }


    return (
        <Layout>
            {customerSpinner && (
                <View style={styles.centerScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!customerSpinner && (
                <>
                    <SearchbarHeader text={searchedCustomerText} onChangeText={searchCustomer} />
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={customers}
                        renderItem={showCustomers}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            )}
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 10
    },
    centerScreen: {
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
