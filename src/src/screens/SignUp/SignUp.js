import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Facebook from '../../assets/Images/Facebook';
import Google from '../../assets/Images/Google';
import Button from '../../constant/Button';
import Input from '../../constant/Input';
import Heading from '../../constant/Heading';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/Images/BackIcon';
import PInput from '../../constant/PInput';
import {
  checkForEmptyKeys,
  checkEmail,
} from '../../../Helpers/InputsNullChecker';
import {Post} from '../../../Helpers/Service';
import Toaster from '../../../Component/Toaster';
import Loader from '../../constant/Loader';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const [filedCheck, setfiledCheck] = useState([]);

  const navigation = useNavigation();

  const submit = () => {
    let {errorString, anyEmptyInputs} = checkForEmptyKeys(userDetail);
    setfiledCheck(anyEmptyInputs);
    if (anyEmptyInputs.length > 0) {
      // Toaster(errorString);
    } else {
      const emailcheck = checkEmail(userDetail.email);
      if (!emailcheck) {
        Toaster('Your email id is invalid');
        return;
      }

      if (userDetail.password !== userDetail.rePassword) {
        Toaster('Your password dose not match with confirm password');
        return;
      }

      const data = {
        email: userDetail.email,
        password: userDetail.password,
        type: 'normal',
      };
      console.log('data==========>', data);
      setLoading(true);
      Post('register', data).then(
        res => {
          setLoading(false);
          console.log(res?.data?.otp);
          if (res.status == 200) {
            Toaster(res.message);
            const data = {
              from: 'signup',
              ...res.data,
            };
            navigation.navigate('OtpVerify', {data});
          }
          if (res.status == 401) {
            Toaster(res.message);
          }
        },
        err => {
          setLoading(false);
          console.log('already exist', err);
        },
      );
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 50,
        backgroundColor: '#fff',
      }}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={{marginBottom: 26, marginLeft: 20}}
        onPress={() => navigation.navigate('Login')}>
        <BackIcon />
      </TouchableOpacity>
      <Heading title="Sign Up" />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#727272',
          textAlign: 'center',
        }}>
        Please registration with email and sign up to continue using our app.
      </Text>
      <PInput
        value={userDetail.email}
        name="email"
        onChangeText={text => {
          setUserDetail({...userDetail, email: text});
        }}
        placeholder="Enter your email address"
      />
      <PInput
        value={userDetail.password}
        onChangeText={text => {
          setUserDetail({...userDetail, password: text});
        }}
        placeholder="Password"
        isPassword={userDetail.password.length !== 0 ? true : false}
      />
      {filedCheck.includes('PASSWORD') && (
        <Text
          style={{
            color: 'red',
            marginHorizontal: 30,
            fontSize: 12,
            marginTop: 5,
          }}>
          Password is required
        </Text>
      )}
      <PInput
        value={userDetail.rePassword}
        onChangeText={text => {
          setUserDetail({...userDetail, rePassword: text});
        }}
        placeholder="Re-enter password"
        isPassword={userDetail.rePassword.length !== 0 ? true : false}
      />
      {filedCheck.includes('REPASSWORD') && (
        <Text
          style={{
            color: 'red',
            marginHorizontal: 30,
            fontSize: 12,
            marginTop: 5,
          }}>
          Confirm password is required
        </Text>
      )}
      <Button
        value="Sign Up"
        onPress={() => {
          submit();
        }}
      />

      <Text
        style={{
          color: '#5A5A5A',
          fontSize: 12,
          lineHeight: 18,
          textAlign: 'center',
          fontFamily: 'Poppins-Bold',
        }}>
        Already have an account!{' '}
        <Text
          style={{color: '#159DEA', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Login')}>
          {' '}
          Sign In
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
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {},
});
