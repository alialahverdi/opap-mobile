import Icon from 'react-native-vector-icons/FontAwesome';

// create a component
const Customer = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Customer Screen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Customer;
