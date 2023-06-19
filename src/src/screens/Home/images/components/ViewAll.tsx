import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ViewAll = (props: any) => {
  return (
    <TouchableOpacity style={[styles.btn, props.style]} onPress={props.onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 10,
            fontFamily: 'Poppins-Medium',
            lineHeight: 15,
            includeFontPadding: true,
            marginRight: 5,
          }}>
          {props.text || 'View All'}
        </Text>
        <Icon name="arrow-forward-ios" size={10} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default ViewAll;

const styles = StyleSheet.create({
  btn: {
    padding: 5,
    backgroundColor: '#33AD66',
    borderRadius: 10,
    paddingHorizontal: 28,
    marginVertical: 25,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
