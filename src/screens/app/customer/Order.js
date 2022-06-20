import Layout from '../../../components/Layout'
import Products from '../../../components/Products'
import OrderModal from '../../../components/Modal/OrderModal'
import OrderListModal from '../../../components/Modal/OrderListModal'
import Header from '../../../components/Header'
import realm from '../../../model/v1/realmInstance'

// create a component
const Order = ({ route, navigation }) => {

    // ------- Constants ------- //
    const customerObj = route.params.customer

    // ------- States ------- //
    const [orderModal, setOrderModal] = useState(false)
    const [isShowList, setIsShowList] = useState(false)
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
                    name="ثبت سفارش"
                    goBack={() => navigation.goBack()}
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
                visible={orderModal}
                onclose={() => setOrderModal(false)}
                onRequestClose={() => setOrderModal(false)}
                product={productObj}
                customer={customerObj}
            />
            <OrderListModal
                visible={isShowOrderListModal}
                onclose={() => setIsShowOrderListModal(false)}
                onRequestClose={() => setIsShowOrderListModal(false)}
                unSentOrders={unSentOrders}
            />
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default Order