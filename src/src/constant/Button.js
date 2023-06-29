import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const Button = props => {
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}>
      <Text style={[styles.text, props.textStyle]}>{props.value}</Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  container: {
    marginVertical: 22,
    marginHorizontal: 20,
    padding: 8,
    backgroundColor: '#159DEA',
    borderRadius: 100,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    lineHeight: 27,
    textTransform: 'uppercase',
  },
});
