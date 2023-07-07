import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ProductButton = props => {
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: props.backgroundColor || '#33AD66',
        borderRadius: 100,
        flexDirection: 'row',
        minWidth:150,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={props.onPress}>
      {props.icon}
      <Text
        style={{
          fontSize: 13,
          color: '#FFF',
          fontFamily: 'Poppins-Regular',
          marginLeft: 5,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductButton;

const styles = StyleSheet.create({});
