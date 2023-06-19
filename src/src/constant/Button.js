import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

const Button = (props) => {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 22,
        marginHorizontal: 20,
        padding: 12,
        backgroundColor: '#159DEA',
        borderRadius: 100,
        alignItems: 'center',
      }}
      onPress={props.onPress}>
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontFamily: 'Poppins-Bold',
          lineHeight: 27,
          textTransform: 'uppercase',
        }}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
