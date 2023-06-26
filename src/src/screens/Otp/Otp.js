import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../constant/Heading';
import BackIcon from '../../assets/Images/BackIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import PInput from '../../constant/PInput';
import Loader from '../../constant/Loader';
import Button from '../../constant/Button';
import Toaster from '../../../Component/Toaster';
import {Post} from '../../utils/Api';
import {checkForEmptyKeys} from '../../utils/Validation';

const Otp = props => {
  const navigation = useNavigation();
  const {otp, email, from} = props?.route?.params?.data;

  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    Otp: '',
  });
  const [filedCheck, setfiledCheck] = useState([]);

  const submit = () => {
    let {errorString, anyEmptyInputs} = checkForEmptyKeys(userDetail);
    setfiledCheck(anyEmptyInputs);

    if (anyEmptyInputs.length > 0) {
      //ss
    } else {
      if (from !== undefined && from === 'signup') {
        setLoading(true);
        if (otp == userDetail.Otp) {
          setLoading(false);
          props.navigation.navigate('UserInfoEdit', {email, type: 'normal'});
          Toaster('Otp verified successfully');
        } else {
          setLoading(false);
          Toaster('Invalid Otp');
        }
      } else {
        const data = {
          email,
          old_otp: otp,
          new_otp: userDetail.Otp,
        };
        setLoading(true);
        Post('confirm_otp', data).then(
          async res => {
            setLoading(false);
            console.log('naya otp ka responce aaya re', res);
            if (res.status == 200) {
              props.navigation.navigate('ChangePassword', {
                email,
              });
            }
          },
          err => {
            setLoading(false);
            console.log(err);
          },
        );
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{marginBottom: 26, marginLeft: 20}}
        onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>
      <View>
        <Heading title="Otp Verify" />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#727272',
            textAlign: 'center',
          }}>
          Enter OTP sent on your registered email below to receive password
          reset instruction
        </Text>
        <PInput
          value={userDetail.Otp}
          name="email"
          keyboardType="number-pad"
          onChangeText={text => {
            setUserDetail({...userDetail, Otp: text});
          }}
          placeholder="Enter your otp.."
        />
        {filedCheck.includes('OTP') && (
          <Text style={{color: 'red'}}> OTP is required</Text>
        )}
        <Button
          value="Submit"
          onPress={() => {
            submit();
          }}
        />
      </View>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({});
