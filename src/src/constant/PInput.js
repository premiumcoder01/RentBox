import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Eye from 'react-native-vector-icons/MaterialCommunityIcons';

import {Pressable} from 'react-native';

const PInput = props => {
  const [hide, setHide] = useState(true);

  return (
    <View style={[styles.container, props.extraStyle]}>
      <TextInput
        placeholderTextColor="#787878"
        style={{
          padding: 0,
          paddingLeft: 15,
          width: '90%',
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
          lineHeight: 18,
          color: '#787878',
          includeFontPadding: true,
          height: 45,
        }}
        secureTextEntry={props.isPassword && hide}
        {...props}
      />
      {props.isPassword && (
        <Pressable onPress={() => setHide(!hide)}>
          <Eye
            name={hide ? 'eye-off' : 'eye'}
            size={20}
            color={hide ? '#159DEA' : '#159DEA'}
          />
        </Pressable>
      )}
    </View>
  );
};

export default PInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: '#E6E6E6',
    borderRadius: 100,
  },
});
