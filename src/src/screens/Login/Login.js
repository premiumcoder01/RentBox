import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginTitle from '../../assets/Images/LoginTitle';
import Heading from '../../constant/Heading';
import {useNavigation} from '@react-navigation/native';
import Button from '../../constant/Button';
import Facebook from '../../assets/Images/Facebook';
import Google from '../../assets/Images/Google';
import OneSignal from 'react-native-onesignal';
import PInput from '../../constant/PInput';
import Loader from '../../constant/Loader';
import {checkForEmptyKeys, checkEmail} from '../../utils/Validation';
import {Post} from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../../Component/Toaster';
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

const Login = props => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  });
  const [filedCheck, setfiledCheck] = useState([]);

  useEffect(() => {
    GoogleSignin.configure();
    Settings.initializeSDK();
  }, []);

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
      OneSignal.getDeviceState().then(async d => {
        setLoading(true);
        (data.device_token = d.pushToken), (data.player_id = d.userId);
        console.log('data==========>', data);
        Post('postlogin', data).then(
          async res => {
            setLoading(false);
            if (res.status == 200) {
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
      });
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
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginHorizontal: 25,
            marginTop: 5,
          }}>
          {' '}
          Email id is required
        </Text>
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
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginHorizontal: 25,
            marginTop: 5,
          }}>
          {' '}
          Password is required
        </Text>
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
