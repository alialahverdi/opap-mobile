import { Button } from 'react-native'
import api from '../../../services/AxiosInstance'
import axios from 'axios'

// create a component
const Product = ({ navigation }) => {

    // ------- Logic or Functions ------- //
    // useEffect(() => {
    //     getProductSync();
    // }, [])

    const getProductSync = async () => {
        api.get('/product/get')
            .then(res => console.log('res', res))
            .catch(() => { })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Product Screen</Text>
            {/* <ActivityIndicator size="small" color="#6f74dd" /> */}
            <Button title='Button' onPress={getProductSync} />
        </SafeAreaView>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
})

//make this component available to the app
export default Product
