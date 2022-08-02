// Navigator
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import OpenOrders from '../screens/app/home/OpenOrders';
import HomeScreen from '../screens/app/home';
import OpenFactors from '../screens/app/home/OpenFactors';
import SalesCustomer from '../screens/app/home/SalesCustomer';
import SalesProduct from '../screens/app/home/SalesProduct';
import SalesSupplier from '../screens/app/home/SalesSupplier';
import SalesDaily from '../screens/app/home/SalesDaily';

// Create Tab fro screens
const Stack = createStackNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="OpenOrders" component={OpenOrders} />
            <Stack.Screen name="OpenFactors" component={OpenFactors} />
            <Stack.Screen name="SalesCustomer" component={SalesCustomer} />
            <Stack.Screen name="SalesProduct" component={SalesProduct} />
            <Stack.Screen name="SalesSupplier" component={SalesSupplier} />
            <Stack.Screen name="SalesDaily" component={SalesDaily} />
        </Stack.Navigator>
    )
}

export default HomeStack;