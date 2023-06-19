import {TextInput} from 'react-native';
import React from 'react';

const Input = (props) => {
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      placeholderTextColor="#787878"
      style={{
        padding: 15,
        marginTop: 15,
        marginHorizontal: 20,
        backgroundColor: '#E6E6E6',
        borderRadius: 100,
        height: 48,
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        lineHeight: 18,
        color: '#787878',
        includeFontPadding: true,
      }}
      {...props}
    />
  );
};

export default Input;
