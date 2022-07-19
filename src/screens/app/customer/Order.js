import Layout from '../../../components/Layout'
import Products from '../../../components/Products'
import OrderModal from '../../../components/Modal/OrderModal'
import OrderListModal from '../../../components/Modal/OrderListModal'
import Header from '../../../components/Header'
import realm from '../../../model/v1/realmInstance'
import { StackActions } from '@react-navigation/native'
import useSnackbar from '../../../hooks/useSnackbar'

// create a component
const Order = ({ route, navigation }) => {

    // ------- Constants ------- //
    const customerObj = route.params.customer
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [orderModal, setOrderModal] = useState(false)
    const [isShowList, setIsShowList] = useState(false)
    const [orderModalType, setOrderModalType] = useState("create")
    const [isShowOrderListModal, setIsShowOrderListModal] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState(null)
    const [unSentOrders, setUnSentOrders] = useState([])
    const [productObj, setProductObj] = useState({})

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmOrders()
    }, [])

    useEffect(() => {
        if (snackbarMessage != null) {
            setTimeout(() => {
                setSnackbarMessage(null)
            }, 3000)
        }
    }, [snackbarMessage])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmUnSentOrders = orders.filtered(`CustomerID == ${customerObj.CustomerID}`)[0].OrderDetail
        setUnSentOrders(realmUnSentOrders)
    }

    const onOrder = (product) => {
        setProductObj(product)
        setOrderModal(true)
    }

    const onDelete = (currentOrderDetail) => {
        setProductObj({})
        realm.write(() => {
            realm.delete(currentOrderDetail)
        })
        setSnackbarMessage({
            variant: "success",
            message: "سفارش با موفقیت حذف شد."
        })
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
                onPress={onOrder}
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
                    setOrderModal(true)
                }}
                onDelete={onDelete}
                navigation={navigation}
            />
        </Layout>
    )
}

//make this component available to the app
export default Order