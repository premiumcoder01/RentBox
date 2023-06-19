import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SubHeading = props => {
  return (
    <View
      style={{
        padding: 5,
        backgroundColor: props.backgroundColor || '#159DEA',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon name="arrow-back-ios" size={15} color="#fff" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Poppins-SemiBold',
          color: '#fff',
          lineHeight: 22,
        }}>
        {props.title}
      </Text>
      <View />
    </View>
  );
};

export default SubHeading;
