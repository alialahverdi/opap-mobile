import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Icons
import Icon from 'react-native-vector-icons/Ionicons'


// Screens
import OrderListScreen from '../screens/order/Ordereds'
import ProductListScreen from '../screens/order/OrderedProducts'


// Create Tab fro screens
const Tab = createBottomTabNavigator();


function OrderStack() {
    return (
        <Tab.Navigator
            initialRouteName="OrderedProducts"
            tabBarOptions={{
                // activeTintColor: "red"
            }}
        >
            <Tab.Screen
                name="Ordereds"
                component={OrderListScreen}
                options={{
                    tabBarLabel: "Ordereds",
                    tabBarIcon: props => <Icon name="reader" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="OrderedProducts"
                component={ProductListScreen}
                options={{
                    tabBarLabel: "OrderedProducts",
                    tabBarIcon: props => <Icon name="podium" size={props.size} color={props.color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default OrderStack;