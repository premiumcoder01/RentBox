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

import Toaster from '../../../Component/Toaster';
import Loader from '../../constant/Loader';
import {Post} from '../../utils/Api';

import {checkForEmptyKeys, checkEmail} from '../../utils/Validation';

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {
  Settings,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        // const {photo, email, name, id} = userInfo.user;
        // let obj = {...userInfo.user, socialType: 'GMAIL'};

        register(userInfo.user);
      }
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const FBlogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        console.log('facebook data result', result);
        if (result.isCancelled) {
          console.log('cancelled', result);
        } else {
          getUserData();
        }
      },
    );
  };

  const getUserData = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      console.log('facebook auth data', data);
      let token = data.accessToken.toString();
      fetch(
        'https://graph.facebook.com/v2.5/me?fields=email,name,id,picture&access_token=' +
          token,
      )
        .then(response => response.json())
        .then(json => {
          console.log('facebook login ka data', json);

          Fbregister(json);
        })
        .catch(() => {
          console.log('ERROR GETTING DATA FROM FACEBOOK');
        });
    });
  };

  const FBLogout = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      let token = data.accessToken.toString();
      let logout = new GraphRequest(
        'me/permissions/',
        {
          accessToken: token,
          httpMethod: 'DELETE',
        },
        (error, result) => {
          if (error) {
            console.log('Error fetching data: ' + error.toString());
          } else {
            LoginManager.logOut();
          }
        },
      );
      new GraphRequestManager().addRequest(logout).start();
    });
  };


  const Fbregister = () => {
    const {email, name, id} = user;
    let data = {
      email,
      social_id: id,
      type: 'facebook',
    };
    setLoading(true);
    Post('register', data).then(
      async res => {
        setLoading(false);
        console.log('final data', res.data);
        if (res.status == 200) {
          FBLogout();
          await AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
          // navigation.navigate('Tab');
        } else {
          // Toaster(res.message);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  const register = user => {
    console.log(user);
    const {photo, email, name, id} = user;
    const data = {
      email: email,
      image: photo,
      first_name: name,
      social_id: id,
      type: 'google',
    };
    GoogleSignin.signOut();
    setLoading(true);
    Post('register', data).then(
      async res => {
        setLoading(false);
        console.log('google-login-data', res);
        if (res.status == 200) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
          navigation.navigate('Tab');
        } else {
          // Toaster(res.message);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
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
        <TouchableOpacity onPress={() => FBlogin()}>
          <Facebook style={{marginRight: 30}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => googleLogin()}>
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
