import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/Header';

const PrivacyPolicy = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Text style={{color: '#000'}}>Coming soon...</Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
