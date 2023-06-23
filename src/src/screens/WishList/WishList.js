import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';

const WishList = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="WishList" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({});
