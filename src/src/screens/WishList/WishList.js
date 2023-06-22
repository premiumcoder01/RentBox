import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';

const WishList = () => {
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

export default WishList;

const styles = StyleSheet.create({});
