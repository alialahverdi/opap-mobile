import Layout from '../../../components/Layout'
import { UIManager, LayoutAnimation, Switch } from 'react-native'
import api from '../../../services/axiosInstance'
import realm from '../../../model/v1/realmInstance'
import { storeArray, storeObj, deleteAllDataFromSchema } from '../../../model/query'
import CustomerCard from '../../../components/CustomerCard'
import SearchbarHeader from '../../../components/SearchbarHeader'
import { toEnglishDigits } from '../../../utils/numbersUtils'
import AlertModal from '../../../components/Modal/AlertModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSnackbar from '../../../hooks/useSnackbar'



// create a component
const Customer = ({ navigation }) => {

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    // ------- Constants ------- //
    const initialRender = useRef(true)
    const { showSnakbar } = useSnackbar()


    // ------- States ------- //
    const [customerSpinner, setCustomerSpinner] = useState(true)
    const [allCustomers, setAllCustomers] = useState([])
    const [renderedCustomers, setRenderedCustomers] = useState([])
    const [searchedCustomerText, setSearchedCustomerText] = useState("")
    const [page, setPage] = useState(0)
    const [prevIndex, setPrevIndex] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [isShowDailyVisit, setIsShowDailyVisit] = useState(true);
    const [customerObj, setCustomerObj] = useState({})
    const [isRendered, setIsRendered] = useState(false)

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getAndCheckVisitDate()
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            setStateCustomers(allCustomers)
            setSearchedCustomerText("")
        }
    }, [isShowDailyVisit])


    const getAndCheckVisitDate = async () => {
        const visitDate = await AsyncStorage.getItem("visitDate")

        const today = new Date().toLocaleDateString('fa-IR-u-nu-latn')

        if (visitDate !== null && visitDate === today) {
            return getRealmCustomers()
        }
        return getApiCustomers()
    }

    const getRealmCustomers = () => {
        const realmCustomers = realm.objects('Customer')
        const customers = JSON.parse(JSON.stringify(realmCustomers))
        const newCustomers = customers.map(item => {
            return {
                ...item,
                layoutHeight: 0
            }
        })
        setAllCustomers(newCustomers)
        setStateCustomers(newCustomers)
    }

    const getApiCustomers = async () => {
        const today = new Date().toLocaleDateString('fa-IR-u-nu-latn')
        await AsyncStorage.setItem('visitDate', today)

        await api.get('/customer/getopenfactor').then(res => {
            storeArray(res.content, "OpenFactor")
        }).catch(() => { })

        await api.get('/customer/get').then(res => {
            storeArray(res.content, "Customer").then(() => {
                console.log('res', res)
                const newCustomers = res.content.map(item => {
                    return {
                        ...item,
                        layoutHeight: 0
                    }
                })
                setAllCustomers(newCustomers)
                setStateCustomers(newCustomers)
            })
        }).catch(() => { })
    }

    const setStateCustomers = async (sentCustomers) => {
        let filteredCustomers
        if (isShowDailyVisit) {
            filteredCustomers = sentCustomers.filter((i) => i.TodayVisit)
            setIsRendered(true)
        } else {
            filteredCustomers = sentCustomers
            setIsRendered(false)
        }
        setRenderedCustomers(filteredCustomers)
        setCustomerSpinner(false)
        setRefreshing(false)
    }

    const setLoadedCustomer = () => {
        const slicedCustomers = allCustomers.slice(page, page + 15)
        setRenderedCustomers(prev => [
            ...prev,
            ...slicedCustomers
        ])
    }

    const onInfo = (customer) => {
        navigation.navigate("InfoScreen", { customer })
    }

    const showCustomers = ({ item, index }) => {
        return (
            <CustomerCard
                customer={item}
                onExpand={() => openLayoutCustomer(index)}
                onOrder={() => onOrder(item)}
                onOpenFactor={() => onOpenFactor(item)}
                onInfo={() => onInfo(item)}
            />
        )
    }

    const openLayoutCustomer = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        // const customersCloned = isShowDailyVisit == true ? [...renderedCustomers] : [...allCustomers]

        const customersCloned = isRendered == true ? [...renderedCustomers] : [...allCustomers]
        if (prevIndex.includes(index)) {
            customersCloned[index].layoutHeight = 0;
            setRenderedCustomers(customersCloned)
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
            setRenderedCustomers(newCustomers)
            setPrevIndex([index])
        }
    }

    const getPreviousOrders = (customer) => {
        const realmOrders = realm.objects("Order").filtered(`CustomerID == ${customer.CustomerID} && isSent==false`)
        const ordersEncoded = JSON.parse(JSON.stringify(realmOrders))
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

    const onOpenFactor = async (customer) => {
        const openFactorRealm = await realm.objects("OpenFactor").filtered(`CustomerID == ${customer.CustomerID}`)
        const openFactorEncoded = openFactorRealm.toJSON()
        if (openFactorRealm.length === 0) {
            return showSnakbar({
                variant: "error",
                message: "این مشتری فاکتور باز ندارد."
            })
        }

        const addSelectable = (arr) => {
            return arr.map(item => {
                return {
                    ...item,
                    selected: false
                }
            })
        }
        const openFactor = {
            factors: addSelectable(openFactorEncoded),
            CustomerName: customer.CustomerName,
            CustomerID: customer.CustomerID
        }
        navigation.navigate("OpenFactorScreen", { openFactor })
    }

    const storeOrder = (customer) => {
        const orderObj = {
            OrderID: Date.now(), // for example returns 1576996323453 
            CustomerID: customer.CustomerID,
            CustomerName: customer.CustomerName,
            Created_at: new Date().toString()
        }
        storeObj(orderObj, "Order").then(res => {
            const newOrder = JSON.parse(JSON.stringify(res))
            navigateToOrderScreen(newOrder)
        })
    }

    const navigateToOrderScreen = (customer) => {
        navigation.navigate("OrderScreen", { customer })
    }

    const searchCustomer = (text) => {
        const oldSearchedCustomers = [...allCustomers]
        if (text == "") { setIsRendered(false) }
        const newSearchedCustomers = oldSearchedCustomers.filter(item => {
            // return item.CustomerName.toLowerCase().match(text)

            return contains(item, text)
        });
        setRenderedCustomers(newSearchedCustomers)
        setIsRendered(true);
        setSearchedCustomerText(text)
    }

    const contains = (item, query) => {
        const { CustomerName, CustomerID } = item

        const textData1 = query.replace("ي", "ی")
        const textData2 = query.replace("ی", "ي")
        const textData3 = query.replace("ك", "ک")
        const textData4 = query.replace("ک", "ك")
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            CustomerName.indexOf(textData1) > -1 ||
            CustomerName.indexOf(textData2) > -1 ||
            CustomerName.indexOf(textData3) > -1 ||
            CustomerName.indexOf(textData4) > -1 ||
            CustomerID.toString().includes(formattedQuery)
        ) return true
        return false
    }

    const handleRefresh = async () => {
        setRefreshing(true)

        await api.get('/customer/getopenfactor').then(res => {
            deleteAllDataFromSchema("OpenFactor").then(() => {
                storeArray(res.content, "OpenFactor")
            })
        }).catch(() => { })


        api.get('/customer/get').then(res => {
            deleteAllDataFromSchema("Customer").then(() => {
                storeArray(res.content, "Customer").then(() => {
                    const newCustomers = res.content.map(item => {
                        return {
                            ...item,
                            layoutHeight: 0
                        }
                    })
                    setAllCustomers(newCustomers)
                    setStateCustomers(newCustomers).then(() => {
                        showSnakbar({
                            variant: "succes",
                            message: "اطلاعت مشتریان آپدیت شد."
                        })
                    })
                })
            })
        }).catch(() => { })
    }

    const handleLoadMore = () => {
        // setPage(prev => prev + 15)
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
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
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
                        data={renderedCustomers}
                        renderItem={showCustomers}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                </>
            )}

            <AlertModal
                isShowModal={isShowModal}
                title="سفارش تکراری"
                description="شما یک سفارش تکراری دارید آیا مایل به ساخت سفارش جدید هستید."
                ok="سفارش جدید"
                hideModal={() => setIsShowModal(false)}
                cancel={() => setIsShowModal(false)}
                onOk={() => {
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
