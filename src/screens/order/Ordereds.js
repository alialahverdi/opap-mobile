import Layout from '../../components/layout'

// create a component
const OrderList = ({ route, navigation }) => {
    console.log('route', route)
    return (
        <Layout>
            <Text>orderList</Text>
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default OrderList