import Layout from '../../../components/Layout'
import Products from '../../../components/Products'
import OrderModal from '../../../components/Modal/OrderModal'

// create a component
const Product = ({ navigation }) => {

    // ------- States ------- //
    const [isShowList, setIsShowList] = useState(false)
    const [productDetail, setProductDetail] = useState({})
    const [orderModal, setOrderModal] = useState(false)

    // ------- Logic or Functions ------- //
    const showDetail = (product) => {
        setProductDetail(product)
        setOrderModal(true)
    }

    return (
        <Layout>
            <Products
                screenType="ProductScreen"
                setIsShowList={setIsShowList}
                onPress={showDetail}
            />
            <OrderModal
                type="show"
                title="جزییات کالا"
                visible={orderModal}
                onclose={() => setOrderModal(false)}
                onRequestClose={() => setOrderModal(false)}
                product={productDetail}
            // customer={customerObj}
            />
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default Product
