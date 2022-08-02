import Layout from '../../../components/Layout'
import Products from '../../../components/Products'
import api from '../../../services/axiosInstance'
import { formatNumber } from '../../../utils/numbersUtils'
import Header from '../../../components/Header'
import { StackActions } from '@react-navigation/native'
// create a component
const SalesDaily = ({ route, navigation }) => {

    // ------- States ------- //
    const [isShowList, setIsShowList] = useState(false)
    const [order, setOrder] = useState([])
    const { typeid } = route.params;
    const getApiSales = () => {
        api.get('/home/salesdaily', { params: { rpttype: typeid } }).then(res => {
            setOrder(res.content)
            //alert(JASON.stringify(order))
        }).catch(() => { })
    }
    useEffect(() => {
        getApiSales()
    }, [])
    return (
        <Layout>
            <Header
                title="فروش روزانه"
                goBack={() => navigation.goBack()}
            />
            <FlatList
                style={{ paddingHorizontal: 10 }}
                data={order}
                renderItem={({ item }) =>
                (
                    <View style={styles.container}>
                        <View style={styles.customerstyle}>
                            <Text numberOfLines={1} style={styles.customerNameText} >
                                {item.SalesDate}
                            </Text>

                        </View>
                        <View style={styles.customerstyle}>
                            <Text style={styles.nameKey}> ریال برگشتی  </Text>
                            <Text numberOfLines={1} style={styles.orderText} >
                                {formatNumber(item.RetAmount)}
                            </Text>
                            <Text style={styles.nameKey}> ریال فروش  </Text>
                            <Text numberOfLines={1} style={styles.amountTextright} >
                                {formatNumber(item.Amount)}
                            </Text>

                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
        // elevation: 5,
        marginTop: 5,
        // borderColor: '#111',
        // borderWidth: 2
    },
    customerstyle: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 2
    },
    left: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red'
    },
    orderButton: {
        width: 35,
        height: 35,
        backgroundColor: '#f1f4fc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        alignItems: "flex-end",
    },
    customerNameText: {
        ...font.black,
        color: "#111",
        paddingHorizontal: 5,
    },
    orderText: {
        ...font.black,
        color: "#3399ff",
        paddingHorizontal: 5,
        flex: 1,
    },
    amountText: {
        ...font.blackBold,
        color: "#0073e6",
        flex: 1,
        //justifyContent: "center",
    },
    salesPriceText: {
        ...font.gray,
        fontSize: 13,
        marginTop: 10
    },
    right: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center"
    },
    productIdText: {
        ...font.black,
        color: "#2367ff"
    },
    supplierContainer: {
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(108, 182, 65, 0.1)',
        // width: 80,
    },
    supplierText: {
        fontFamily: 'IRANSansMobile(FaNum)',
        fontSize: 10,
        color: '#6CB641',
    },
    amountTextright: {
        ...font.blackBold,
        color: "#0073e6",
        paddingHorizontal: 2
        //justifyContent: "center",
    },
    nameKey: {
        ...font.gray,
        fontSize: 11,
        paddingVertical: 2
    },
})


//make this component available to the app
export default SalesDaily
