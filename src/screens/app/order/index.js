

// create a component
const Order = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Order Screen</Text>
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
export default Order
