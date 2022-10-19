// Load required Components and Packegs 
import "./src/utils/Global"

// Register react navigation in app
import 'react-native-gesture-handler'

// Navigator
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Stacks and Screen
import SplashScreen from './src/screens/splash'
import AuthStack from './src/navigation/AuthStack'
import AppStack from './src/navigation/AppStack'
import ExitModal from "./src/components/Modal/ExitModal"

// Wrapper Components
import SnakbarProvider from "./src/components/Snakbar/SnakbarProvider"
import ErrorHandler from "./src/components/ErrorHandler"


// Create stack fro all screens
const Stack = createStackNavigator()

const Root = () => {
  return (
    <Stack.Navigator
      headerMode="none"
    // mode="modal"
    // screenOptions={{
    //   cardStyle: { backgroundColor: 'transparent' },
    //   cardOverlayEnabled: true,
    //   cardStyleInterpolator: ({ current: { progress } }) => ({
    //     cardStyle: {
    //       opacity: progress.interpolate({
    //         inputRange: [0, 0.5, 0.9, 1],
    //         outputRange: [0, 0.25, 0.7, 1],
    //       }),
    //     },
    //     overlayStyle: {
    //       opacity: progress.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [0, 0.5],
    //         extrapolate: 'clamp',
    //       }),
    //     },
    //   }),
    // }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
      {/* <Stack.Screen name="ExitModal" component={ExitModal} /> */}
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <SnakbarProvider>
        <Root />
      </SnakbarProvider>
    </NavigationContainer>
  )
}
export default App;
