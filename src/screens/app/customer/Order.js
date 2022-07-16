import Layout from '../../../components/Layout'
import Products from '../../../components/Products'
import OrderModal from '../../../components/Modal/OrderModal'
import OrderListModal from '../../../components/Modal/OrderListModal'
import Header from '../../../components/Header'
import realm from '../../../model/v1/realmInstance'
import { StackActions } from '@react-navigation/native'

// create a component
const Order = ({ route, navigation }) => {

    // ------- Constants ------- //
    const customerObj = route.params.customer

    // ------- States ------- //
    const [orderModal, setOrderModal] = useState(false)
    const [isShowList, setIsShowList] = useState(false)
    const [orderModalType, setOrderModalType] = useState("create")
    const [isShowOrderListModal, setIsShowOrderListModal] = useState(false)
    const [unSentOrders, setUnSentOrders] = useState([])
    const [productObj, setProductObj] = useState({})

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmOrders()
    }, [])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmUnSentOrders = orders.filtered(`CustomerID == ${customerObj.CustomerID}`)[0].OrderDetail
        setUnSentOrders(realmUnSentOrders)
    }

    const onOrder = (product) => {
        setProductObj(product)
        setOrderModal(true)
    }

    return (
        <Layout>
            {isShowList && (
                <Header
                    title="سفارشات"
                    goBack={() => navigation.dispatch(StackActions.replace("CustomerScreen"))}
                    countOrder={unSentOrders.length}
                    onShowOrderListModal={() => setIsShowOrderListModal(!isShowOrderListModal)}
                />
            )}
            <Products
                screenType="OrderedProducts"
                OnOrder={onOrder}
                setIsShowList={setIsShowList}
            />
            <OrderModal
                type={orderModalType}
                title={orderModalType == "create" ? "ثبت کالا" : "ویرایش کالا"}
                visible={orderModal}
                onclose={() => {
                    setOrderModal(false)
                    if (orderModalType === "update") {
                        setIsShowOrderListModal(true)
                    } else {
                        setOrderModalType("create")
                    }
                }}
                onRequestClose={() => {
                    setOrderModalType("create")
                    setOrderModal(false)
                }}
                product={productObj}
                customer={customerObj}
            />
            <OrderListModal
                type="create"
                title="ثبت سفارش"
                visible={isShowOrderListModal}
                onclose={() => {
                    setIsShowOrderListModal(false)
                }}
                onRequestClose={() => {
                    setIsShowOrderListModal(false)
                }}
                customer={customerObj}
                orders={unSentOrders}
                setUnSentOrders={setUnSentOrders}
                onUpdate={value => {
                    setOrderModalType("update")
                    setProductObj(value)
                    setIsShowOrderListModal(false)
                }}
                navigation={navigation}
            />
        </Layout>
    )
}

//make this component available to the app
export default Order