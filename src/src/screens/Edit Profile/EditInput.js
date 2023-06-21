import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import Eye from 'react-native-vector-icons/MaterialCommunityIcons';

const EditInput = props => {
  const [hide, setHide] = useState(true);
  return (
    <View style={{marginBottom: 10}}>
      <Text
        style={{color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular'}}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: .5,
          borderColor: '#8E8E8E',
        }}>
        {props.leftIcon}
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
        
          secureTextEntry={props.isPassword && hide}
          {...props}
          style={{marginHorizontal: 10, width: '80%', padding: 2}}
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
    </View>
  );
};

export default EditInput;

const styles = StyleSheet.create({});
