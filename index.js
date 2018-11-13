/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import bgMessaging from './src/bgMessaging'; // <-- Import the file you created in (2)

// Current main application
AppRegistry.registerComponent('ReactNativeFirebaseDemo', () => bootstrap);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
AppRegistry.registerComponent(appName, () => App);
