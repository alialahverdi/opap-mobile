// Navigator
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import CustomerScreen from '../screens/app/customer'
import OrderScreen from '../screens/app/customer/Order'


// Create Tab fro screens
const Stack = createStackNavigator();


const CustomerStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
    )
}

export default CustomerStack;