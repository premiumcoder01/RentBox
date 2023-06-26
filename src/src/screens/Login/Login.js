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
import Loader from '../../constant/Loader';
import {checkForEmptyKeys, checkEmail} from '../../utils/Validation';
import {Post} from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../../Component/Toaster';

const Login = props => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  });
  const [filedCheck, setfiledCheck] = useState([]);

  const isLogin = () => {
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
        password: userDetail.password,
      };
      setLoading(true);
      Post('postlogin', data).then(
        async res => {
          setLoading(false);
          if (res.status == 200) {
            console.log('login responce', res);
            await AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
            navigation.navigate('Tab');
          } else {
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
        name="email"
        value={userDetail.email}
        onChangeText={text => {
          setUserDetail({...userDetail, email: text});
        }}
        placeholder="Enter your email address"
        keyboardType="email-address"
      />
      {filedCheck.includes('EMAIL') && (
        <Text style={{color: 'red'}}> Email id is required</Text>
      )}
      <PInput
        value={userDetail.password}
        onChangeText={text => {
          setUserDetail({...userDetail, password: text});
        }}
        placeholder="Password"
        isPassword={userDetail.password.length !== 0 ? true : false}
      />
      {filedCheck.includes('PASSWORD') && (
        <Text style={{color: 'red'}}> Password is required</Text>
      )}

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
      <Loader modalVisible={loading} setModalVisible={setLoading} />
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
