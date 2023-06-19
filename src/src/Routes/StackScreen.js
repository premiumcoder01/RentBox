import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AboutUs,
  ChatInBox,
  EditProfile,
  FAQ,
  FollowUs,
  Help,
  Home,
  ManageProduct,
  Notification,
  PrivacyPolicy,
  SearchScreen,
  TermsConditions,
} from '../screens';
const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={Home} />
      <Stack.Screen name="Manage Products" component={ManageProduct} />
      <Stack.Screen name="About Us" component={AboutUs} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Stack.Screen name="Term & Conditions" component={TermsConditions} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Notification" component={Notification} />

      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="FollowUs" component={FollowUs} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ChatInbox" component={ChatInBox} />
    </Stack.Navigator>
  );
};

export default StackScreen;
