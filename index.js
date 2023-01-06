/**
 * @format
 */

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


import locationTracker from './src/services/locationTracker'

// Register the service
ReactNativeForegroundService.register();
// Location tracker task
ReactNativeForegroundService.add_task(
    () => locationTracker(),
    {
        delay: 10000,
        onLoop: true,
        taskId: 'taskid',
        onError: (e) => console.log(`Error logging:`, e),
    },
)

AppRegistry.registerComponent(appName, () => App);
