import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


// Icons
import Icon from 'react-native-vector-icons/Ionicons';


// Screens
import HomeScreen from '../screens/app/home';
import CustomerStack from '../navigation/CustomerStack';
import ProductScreen from '../screens/app/product';
import OrderTabsScreen from '../screens/app/orderTabs';
import TestScreen from '../screens/app/Test';


// Create Tab fro screens
const Tab = createBottomTabNavigator()

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'CustomerStack'
    if (routeName === "OrderScreen") {
        return false
    }
    return true
}


const AppStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBarOptions={{
                // activeTintColor: "red"
            }}
        >
            <Tab.Screen
                name="OrderTabsScreen"
                component={OrderTabsScreen}
                options={{
                    tabBarLabel: "سفارشات",
                    tabBarIcon: props => <Icon name="reader" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    tabBarLabel: "محصولات",
                    tabBarIcon: props => <Icon name="podium" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="CustomerStack"
                component={CustomerStack}
                options={({ route }) => ({
                    tabBarLabel: "مشتریان",
                    tabBarIcon: props => <Icon name="people" size={props.size} color={props.color} />,
                    tabBarVisible: getTabBarVisibility(route)
                })}
            />
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: "خانه",
                    tabBarIcon: props => <Icon name="home" size={props.size} color={props.color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default AppStack;