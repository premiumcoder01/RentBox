import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Button from '../../constant/Button';
import Input from '../../constant/Input';
import Heading from '../../constant/Heading';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/Images/BackIcon';
import PInput from '../../constant/PInput';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const isRegister = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginBottom: 30, marginLeft: 20}}
        onPress={() => navigation.navigate('Login')}>
        <BackIcon />
      </TouchableOpacity>
      <Heading title="Forgot Password?" />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#727272',
          textAlign: 'center',
        }}>
        Enter your registered email below to receive password reset instruction
      </Text>
      <PInput
        value={email}
        name="email"
        onChangeText={text => setEmail(text)}
        secureTextEntry={false}
        placeholder="Enter your email address"
        keyboardType="email-address"
        maxLength={100}
      />
      <Button value="Send" onPress={() => isRegister()} />
      <Text
        style={{
          color: '#5A5A5A',
          fontSize: 12,
          lineHeight: 18,
          textAlign: 'center',
          fontFamily: 'Poppins-Bold',
        }}>
        Remember password?{' '}
        <Text
          style={{color: '#159DEA', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Login')}>
          {' '}
          Sign In
        </Text>
      </Text>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
