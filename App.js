import './ignoreWarnings';
import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const APP_ID = 'b00faf62-d933-443b-b03a-a9813b30799c';
const SENDER_ID = '1088833333526';

import {LogBox} from 'react-native';
import DashBoard from './src/src/Routes/DashBoard';
const ref = createNavigationContainerRef();
const App = () => {
  const [routeName, setRouteName] = useState();
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
