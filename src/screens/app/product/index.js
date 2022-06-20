import Layout from '../../../components/Layout'
import Products from '../../../components/Products'

// create a component
const Product = ({ navigation }) => {

    return (
        <Layout>
            <Products screenType="Product" />
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default Product
