import Layout from '../../../components/Layout'


// create a component
const OpenFactor = ({ navigation }) => {

    // ------- States ------- //
    const [isShowList, setIsShowList] = useState(false)
    const [productDetail, setProductDetail] = useState({})
    const [orderModal, setOrderModal] = useState(false)

    const showDetail = (product) => {
        setProductDetail(product)
        setOrderModal(true)
    }

    return (
        <Layout>
            <Text>OpenFactor</Text>
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default OpenFactor
