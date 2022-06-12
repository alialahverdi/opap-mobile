import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Icons
import Icon from 'react-native-vector-icons/Ionicons';


// Screens
import HomeScreen from '../screens/app/home';
import CustomerScreen from '../screens/app/customer';
import ProductScreen from '../screens/app/product';
import OrderListScreen from '../screens/app/orderList';
import TestScreen from '../screens/app/Test';


// Create Tab fro screens
const Tab = createBottomTabNavigator();


function AppStack() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                // activeTintColor: "red"
            }}
        >
            <Tab.Screen
                name="OrderListScreen"
                component={OrderListScreen}
                options={{
                    tabBarLabel: "Order",
                    tabBarIcon: props => <Icon name="reader" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="Product"
                component={ProductScreen}
                options={{
                    tabBarLabel: "Product",
                    tabBarIcon: props => <Icon name="podium" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="Customer"
                component={CustomerScreen}
                options={{
                    tabBarLabel: "Customer",
                    tabBarIcon: props => <Icon name="people" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: props => <Icon name="home" size={props.size} color={props.color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default AppStack;