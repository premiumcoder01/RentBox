import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LoginTitle from '../../assets/Images/LoginTitle';
import Heading from '../../constant/Heading';
import {useNavigation} from '@react-navigation/native';
import Button from '../../constant/Button';
import Facebook from '../../assets/Images/Facebook';
import Google from '../../assets/Images/Google';
import PInput from '../../constant/PInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const isLogin = () => {
    navigation.navigate('Tab');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 50,
        backgroundColor: '#fff',
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <LoginTitle style={{alignSelf: 'center', marginBottom: 40}} />
      <Heading title="Login" />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#727272',
          textAlign: 'center',
        }}>
        Please sign in to countinue using our app.
      </Text>
      <PInput
        value={email}
        name="email"
        onChangeText={text => setEmail(text)}
        placeholder="Enter your email address"
        keyboardType="email-address"
      />
      <PInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        isPassword={password.length !== 0 ? true : false}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text
          style={{
            color: '#5A5A5A',
            fontSize: 12,
            lineHeight: 18,
            marginTop: 12,
            textAlign: 'center',
            fontFamily: 'Poppins-Bold',
          }}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <Button value="Login" onPress={() => isLogin()} />

      <Text
        style={{
          color: '#5A5A5A',
          fontSize: 12,
          lineHeight: 18,
          textAlign: 'center',
          fontFamily: 'Poppins-Bold',
        }}>
        Dont’t have an account?{' '}
        <Text
          style={{color: '#159DEA', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('SignUp')}>
          {' '}
          Sign Up
        </Text>
      </Text>
      <View
        style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        <TouchableOpacity>
          <Facebook style={{marginRight: 30}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Google />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
