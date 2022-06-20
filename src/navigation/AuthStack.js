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

const AuthStack = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;