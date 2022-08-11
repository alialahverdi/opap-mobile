import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


// Icons
import Icon from 'react-native-vector-icons/Ionicons';


// Screens
import HomeScreen from '../screens/app/home';
import CustomerStack from '../navigation/CustomerStack';
import ProductScreen from '../screens/app/product';
import OrderTabsScreen from '../screens/app/orderTabs';
import HomeStack from './HomeStack';

// Create Tab fro screens
const Tab = createBottomTabNavigator()

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'CustomerStack'
    if (routeName === "OrderScreen" || routeName === "InfoScreen") {
        return false
    }
    if (routeName === "OpenFactors" || routeName === "OpenOrders" || routeName === "SalesSupplier"
        || routeName === "SalesProduct" || routeName === "SalesDaily" || routeName === "SalesCustomer") {
        return false
    }
    return true
}

const label = (props, label) => {
    return (
        <Text style={[
            { color: props.color },
            styles.lable
        ]}
        >
            {label}
        </Text>
    )
}


const AppStack = () => {

    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);

    //     return () =>
    //         BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, [])

    // const backAction = () => {
    //     BackHandler.exitApp()
    // }

    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            tabBarOptions={{
                // activeTintColor: "red"
            }}
        >
            <Tab.Screen
                name="OrderTabsScreen"
                component={OrderTabsScreen}
                options={{
                    tabBarLabel: props => label(props, "سفارشات"),
                    tabBarIcon: props => <Icon name="reader" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    tabBarLabel: props => label(props, "محصولات"),
                    tabBarIcon: props => <Icon name="medkit-outline" size={props.size} color={props.color} />
                }}
            />
            <Tab.Screen
                name="CustomerStack"
                component={CustomerStack}
                options={({ route }) => ({
                    tabBarLabel: props => label(props, "مشتریان"),
                    tabBarIcon: props => <Icon name="people" size={props.size} color={props.color} />,
                    tabBarVisible: getTabBarVisibility(route)
                })}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarLabel: "خانه",
                    tabBarIcon: props => <Icon name="home" size={props.size} color={props.color} />,
                    tabBarVisible: getTabBarVisibility(route)
                })}
            />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    lable: {
        fontFamily: "IRANSansMobile(FaNum)",
        fontSize: Platform.OS === "ios" ? 12 : 10
    }
})

export default AppStack;