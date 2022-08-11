// Navigator
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import CustomerScreen from '../screens/app/customer'
import Info from '../screens/app/customer/Info';
import OpenFactor from '../screens/app/customer/OpenFactor';
import OpenFactors from '../screens/app/customer/OpenFactors';
import OrderScreen from '../screens/app/customer/Order'


// Create Tab fro screens
const Stack = createStackNavigator();


const CustomerStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="InfoScreen" component={Info} />
            <Stack.Screen name="OpenFactorScreen" component={OpenFactor} />
            <Stack.Screen name="InfoOpenFactorsScreen" component={OpenFactors} />
        </Stack.Navigator>
    )
}

export default CustomerStack;