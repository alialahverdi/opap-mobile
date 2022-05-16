// Create a component
const Splash = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Splash Screen</Text>
        </View>
    );
};

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//Make this component available to the app
export default Splash;
