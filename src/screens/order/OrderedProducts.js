import Layout from '../../components/layout'
import Products from '../../components/Products'
import OrderModal from '../../components/Modal/OrderModal'

// create a component
const OrderedProducts = ({ route, navigation }) => {

    // console.log('route =======>', route.params)
    // ------- States ------- //
    const [orderModal, setOrderModal] = useState(false)
    const [productObj, setProductObj] = useState({})

    const OnOrder = (product) => {
        setProductObj(product)
        setOrderModal(true)
    }

    return (
        <Layout>
            <Products screenType="OrderedProducts" OnOrder={OnOrder} />
            <OrderModal
                visible={orderModal}
                onclose={() => setOrderModal(false)}
                onRequestClose={() => setOrderModal(false)}
                product={productObj}
            />
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default OrderedProducts