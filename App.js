import './ignoreWarnings';
import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

// new keys created for rentbox from firebase
const APP_ID = '3c55c9e2-1088-41e8-a83f-8d90550cabc8';
const SENDER_ID = '89227668541';

import {LogBox} from 'react-native';
import DashBoard from './src/src/Routes/DashBoard';
import OneSignal from 'react-native-onesignal';
const ref = createNavigationContainerRef();
const App = () => {
  const [routeName, setRouteName] = useState();
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    SplashScreen.hide();
  }, []);

 

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(APP_ID);

    OneSignal.getDeviceState().then(async res => {
      console.log(res);
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();

        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }, [OneSignal]);

  return (
    <NavigationContainer
      ref={ref}
      // onReady={() => {
      //   setRouteName(ref.getCurrentRoute().name);
      // }}
      onStateChange={async () => {
        // const previousRouteName = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}>
      <StatusBar backgroundColor="#159DEA" />
      <DashBoard routeName={routeName} />
    </NavigationContainer>
  );
};

export default App;
