import Layout from '../../../components/Layout'
import Products from '../../../components/Products'

// create a component
const Product = ({ navigation }) => {

    // ------- States ------- //
    const [isShowList, setIsShowList] = useState(false)

    return (
        <Layout>
            <Products screenType="Product" setIsShowList={setIsShowList} />
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default Product
