import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screens/app/home';

// Transition for navigate between screen
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    // gestureEnabled: true,
};


// Create stack fro screens
const Stack = createStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default AppStack;