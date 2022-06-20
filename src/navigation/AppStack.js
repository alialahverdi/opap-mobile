import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Icons
import Icon from 'react-native-vector-icons/Ionicons';


// Screens
import HomeScreen from '../screens/app/home';
import CustomerStack from '../navigation/CustomerStack';
import ProductScreen from '../screens/app/product';
import OrderListScreen from '../screens/app/orderList';
import TestScreen from '../screens/app/Test';


// Create Tab fro screens
const Tab = createBottomTabNavigator();


const AppStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
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
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    tabBarLabel: "Product",
                    tabBarIcon: props => <Icon name="podium" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="CustomerStack"
                component={CustomerStack}
                options={{
                    tabBarLabel: "Customer",
                    tabBarIcon: props => <Icon name="people" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="HomeScreen"
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