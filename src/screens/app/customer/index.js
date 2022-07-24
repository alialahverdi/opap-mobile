import Layout from '../../../components/Layout'
import { UIManager, LayoutAnimation, Switch } from 'react-native'
import api from '../../../services/axiosInstance'
import realm from '../../../model/v1/realmInstance'
import { storeArray, storeObj, deleteAllDataFromSchema } from '../../../model/query'
import CustomerCard from '../../../components/CustomerCard'
import SearchbarHeader from '../../../components/SearchbarHeader'
import { toEnglishDigits } from '../../../utils/numbersUtils'
import { generatorID } from '../../../utils/IDUtils'
import AlertModal from '../../../components/Modal/AlertModal'
import * as Animatable from 'react-native-animatable'



// create a component
const Customer = ({ navigation }) => {

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    // ------- Constants ------- //


    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(true)
    const [customers, setCustomers] = useState([])
    const [realmCustomers, setRealmCustomers] = useState([])
    const [searchedCustomers, setSearchedCustomers] = useState([])
    const [page, setPage] = useState(0)
    const [searchedCustomerText, setSearchedCustomerText] = useState("")
    const [prevIndex, setPrevIndex] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [isShowDailyVisit, setIsShowDailyVisit] = useState(true);
    const [customerObj, setCustomerObj] = useState({})


    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmCustomers()
    }, [])

    const getRealmCustomers = () => {
        const realmCustomers = realm.objects('Customer')
        const customers = JSON.parse(JSON.stringify(realmCustomers))
        if (customers.length > 0) {
            return addExpandable(customers)
        }
        if (customers.length == 0) {
            return getApiCustomers()
        }
    }

    const getApiCustomers = () => {
        api.get('/customer/get').then(res => {
            storeArray(res.content, "Customer").then(() => {
                addExpandable(res.content)
            })
        }).catch(() => { })
    }

    const addExpandable = (sentCustomers) => {
        const newCustomers = sentCustomers.map(item => {
            return {
                ...item,
                layoutHeight: 0
            }
        })

        let filteredCustomers
        if (isShowDailyVisit) {
            filteredCustomers = newCustomers.filtered((i) => i.TodayVisit)
            console.log('isShowDailyVisit', isShowDailyVisit)
        } else {
            filteredCustomers = newCustomers
            console.log('end', isShowDailyVisit)
        }
        setCustomers(filteredCustomers)
        setSearchedCustomers(newCustomers)
        setCustomerSpinner(false)
        setRefreshing(false)
    }

    const setLoadedCustomer = () => {
        const slicedCustomers = realmCustomers.slice(page, page + 15)
        setCustomers(prev => [
            ...prev,
            ...slicedCustomers
        ])
    }

    const showCustomers = ({ item, index }) => {
        const delayindex = index + 1

        return (
            <Animatable.View
                animation="fadeInUp"
                duration={400}
                delay={delayindex * 100}
                useNativeDriver={true}

            >
                <CustomerCard
                    customer={item}
                    onExpand={() => openLayoutCustomer(index)}
                    onOrder={() => onOrder(item)}
                />
            </Animatable.View>

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
        setCustomerObj(customer)
        const previousOrders = getPreviousOrders(customer)
        if (previousOrders.length > 0) {
            return setIsShowModal(true)
        }
        return storeOrder(customer)
    }

    const storeOrder = (customer) => {
        const orderObj = {
            OrderID: generatorID(),
            CustomerID: customer.CustomerID,
            CustomerName: customer.CustomerName,
            Created_at: new Date().toString()
        }
        storeObj(orderObj, "Order").then(res => {
            navigateToOrderScreen(res.toJSON())
        })
    }

    const navigateToOrderScreen = (customer) => {
        navigation.navigate("OrderScreen", { customer })
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
        const { CustomerName, CustomerID } = item
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            CustomerName.includes(query) ||
            CustomerID.toString().includes(formattedQuery)
        ) return true
        return false
    }

    const handleRefresh = () => {
        setRefreshing(true)
        api.get('/customer/get').then(res => {
            deleteAllDataFromSchema("Customer").then(() => {
                storeArray(res.content, "Customer").then(() => {
                    addExpandable(res.content)
                })
            })
        }).catch(() => { })
    }

    const handleLoadMore = () => {
        setPage(prev => prev + 15)
    }

    const toggleSwitch = () => setIsShowDailyVisit(previousState => !previousState);

    return (
        <Layout>
            {customerSpinner && (
                <View style={styles.centerScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!customerSpinner && (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.dalyVisit}>
                            <Switch
                                trackColor={{ false: "#ddd", true: "#81b0ff" }}
                                thumbColor={isShowDailyVisit ? "#2367ff" : "#f4f3f4"}
                                onValueChange={toggleSwitch}
                                value={isShowDailyVisit}
                            />
                            <Text style={styles.dalyVisitTitle}>ویزیت روزانه</Text>
                        </View>
                        <SearchbarHeader text={searchedCustomerText} onChangeText={searchCustomer} />
                    </View>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={customers}
                        renderItem={showCustomers}
                        keyExtractor={(item, index) => index.toString()}
                        // onEndReached={handleLoadMore}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}

                    />
                </>
            )}

            <AlertModal
                isShowModal={isShowModal}
                hideModal={() => setIsShowModal(false)}
                cancel={() => setIsShowModal(false)}
                newOrder={() => {
                    storeOrder(customerObj)
                    setIsShowModal(false)
                }}
            />
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
    },
    dalyVisit: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 5
    },
    dalyVisitTitle: {
        ...font.gray,
        fontSize: 12
    }
})

//make this component available to the app
export default Customer
