import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';

// Transition for navigate between screen
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    // gestureEnabled: true,
};


// Create stack fro screens
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;