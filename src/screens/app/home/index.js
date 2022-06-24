import { useContext } from 'react'
import realm from '../../../model/v1/realmInstance'
import { store } from '../../../model/query'
import snackbarContext from '../../../contexts/snackbarContext'




// create a component
const Home = ({ navigation }) => {

    // const [simsContent, setSimsContent] = useContext(snackbarContext);


    // ------- Logic or Functions ------- //
    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f1f3',
    },
})

//make this component available to the app
export default Home
