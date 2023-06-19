import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CategoryDropDown = props => {
  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        maxHeight={300}
        labelField="label"
        statusBarIsTranslucent={true}
        valueField="value"
        placeholder={props.placeholder}
        value={props.value}
        onChange={item => {
          props.setValue(item.value);
        }}
      />
    </View>
  );
};

export default CategoryDropDown;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 37,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 30,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
