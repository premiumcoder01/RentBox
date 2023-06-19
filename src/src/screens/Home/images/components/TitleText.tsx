import {View, Text} from 'react-native';
import React from 'react';

const TitleText = (props: any) => {
  return (
    <Text
      style={{
        color: props.color || "#000",
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 5,
      }}>
      {props.title}
    </Text>
  );
};

export default TitleText;
