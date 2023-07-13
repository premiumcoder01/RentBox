import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Button from '../../constant/Button';
import Input from '../../constant/Input';
import Heading from '../../constant/Heading';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/Images/BackIcon';
import PInput from '../../constant/PInput';
import {checkForEmptyKeys, checkEmail} from '../../utils/Validation';
import Toaster from '../../../Component/Toaster';
import {Post} from '../../utils/Api';
import Loader from '../../constant/Loader';

const ChangePassword = props => {
  const emails = props?.route?.params.email;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(emails);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
 
  const [filedCheck, setfiledCheck] = useState([]);

  const isReset = () => {
    let {anyEmptyInputs} = checkForEmptyKeys(email,password,rePassword);
    setfiledCheck(anyEmptyInputs);

    if (anyEmptyInputs.length > 0) {
      // Toaster(errorString);
    } else {
      const emailcheck = checkEmail(email);
      if (!emailcheck) {
        Toaster('Your email id is invalid');
        return;
      }

      if (password.length !== 6) {
        Toaster('Your minimum password length should be greater than 5');
        return;
      }

      if (password !== rePassword) {
        Toaster('Your password dose not match with confirm password');
        return;
      }

      const data = {
        email: email,
        password: password,
        confirm_password: rePassword,
      };
      console.log('data==========>', data);
      setLoading(true);
      Post('change_password', data).then(
        res => {
          setLoading(false);
          if (res.status == 200) {
            Toaster(res.message);
            props.navigation.navigate('Login');
          }
        },
        err => {
          setLoading(false);
          console.log(err);
        },
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginBottom: 30, marginLeft: 20}}
        onPress={() => props.navigation.navigate('Login')}>
        <BackIcon />
      </TouchableOpacity>
      <Heading title="Reset Password" />

      <PInput
        value={email}
        name="email"
        onChangeText={text => setEmail(text)}
        editable={false}
        secureTextEntry={false}
        placeholder="Enter your email address"
        keyboardType="email-address"
        maxLength={100}
      />
      {filedCheck.includes('EMAIL') && (
        <Text style={{color: 'red', fontSize: 12}}> Email id is required</Text>
      )}
      <PInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="New Password"
        isPassword={password.length !== 0 ? true : false}
      />
      {filedCheck.includes('PASSWORD') && (
        <Text style={{color: 'red', fontSize: 12}}> Password is required</Text>
      )}
      <PInput
        value={rePassword}
        onChangeText={text => setRePassword(text)}
        placeholder="Cnfirm Password"
        isPassword={rePassword.length !== 0 ? true : false}
      />
      {filedCheck.includes('REPASSWORD') && (
        <Text style={{color: 'red', fontSize: 12}}>
          {' '}
          Confirm password is required
        </Text>
      )}
      <Button value="Reset" onPress={() => isReset()} />
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
          onPress={() => props.navigation.navigate('Login')}>
          {' '}
          Sign In
        </Text>
      </Text>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
