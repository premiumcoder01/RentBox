import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PInput from '../../constant/PInput';
import Header from '../../components/Header';

const EditProduct = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <View
        style={{
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 25,
          margin: 20,
          elevation: 4,
        }}>
        <PInput />
      </View>
    </View>
  );
};

export default EditProduct;

const styles = StyleSheet.create({});
