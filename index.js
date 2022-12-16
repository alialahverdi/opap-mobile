/**
 * @format
 */
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import locationTracker from './src/services/locationTracker'

// Register the service
ReactNativeForegroundService.register();
ReactNativeForegroundService.start({
    id: 144,
    title: 'Location Tracker',
    message: 'سرویس فعال است.',
});
ReactNativeForegroundService.add_task(
    () => locationTracker(),
    {
        delay: 5000,
        onLoop: false,
        taskId: 'taskid',
        onError: (e) => console.log(`Error logging:`, e),
    },
)

AppRegistry.registerComponent(appName, () => App);
