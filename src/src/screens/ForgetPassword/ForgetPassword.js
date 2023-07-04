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
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: '',
  });
  const [filedCheck, setfiledCheck] = useState([]);

  const navigation = useNavigation();

  const isForget = () => {
    let {anyEmptyInputs} = checkForEmptyKeys(userDetail);
    setfiledCheck(anyEmptyInputs);

    if (anyEmptyInputs.length > 0) {
      // Toaster(errorString);
    } else {
      const emailcheck = checkEmail(userDetail.email);
      if (!emailcheck) {
        Toaster('Your email id is invalid');
        return;
      }

      const data = {
        email: userDetail.email,
      };
      console.log('data==========>', data);
      setLoading(true);
      Post('send_otp', data).then(
        async res => {
          setLoading(false);
          console.log('otp for forget password', res.data.otp);
          if (res.status == 200) {
            navigation.navigate('OtpVerify', {data: res.data});
            Toaster(res.message);
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
        value={userDetail.email}
        name="email"
        onChangeText={text => {
          setUserDetail({...userDetail, email: text});
        }}
        secureTextEntry={false}
        placeholder="Enter your email address"
        keyboardType="email-address"
        maxLength={100}
      />
      {filedCheck.includes('EMAIL') && (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginHorizontal: 25,
            marginTop: 5,
          }}>
          Email id is required
        </Text>
      )}
      <Button value="Send" onPress={() => isForget()} />
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
      <Loader modalVisible={loading} setModalVisible={setLoading} />
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
