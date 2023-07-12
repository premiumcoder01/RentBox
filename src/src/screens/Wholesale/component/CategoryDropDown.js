import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CategoryDropDown = props => {
  return (
    <View>
      <Dropdown
        style={[styles.dropdown, props.dropdownStyle]}
        placeholderStyle={[styles.placeholderStyle, props.textStyle]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          props.textStyle,
          props.maintext,
        ]}
        iconColor={props.iconColor}
        iconStyle={[styles.iconStyle, props.iconSStyle]}
        data={props.data}
        maxHeight={300}
        itemTextStyle={[props.textStyle]}
        labelField={props.labelField || 'name'}
        statusBarIsTranslucent={true}
        valueField={props.valueField || 'name'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </View>
  );
};

export default CategoryDropDown;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 30,
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
    textAlign: 'left',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    // textAlign: 'center',
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
