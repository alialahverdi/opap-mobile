import { useContext } from 'react'
import realm from '../../../model/v1/realmInstance'
import { store } from '../../../model/query'
import snackbarContext from '../../../contexts/snackbarContext'
import Layout from '../../../components/Layout'




// create a component
const Home = ({ navigation }) => {

    // const [simsContent, setSimsContent] = useContext(snackbarContext);


    // ------- Logic or Functions ------- //
    useEffect(() => {
    }, [])

    return (
        <Layout>
            <Text>Home</Text>
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
})

//make this component available to the app
export default Home
