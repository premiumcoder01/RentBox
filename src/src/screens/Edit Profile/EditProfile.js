import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import CameraIcon from '../../assets/Images/ProfileIcons/CameraIcon';
import EditInput from './EditInput';
import EmailIcon from '../../assets/Images/ProfileIcons/EmailIcon';
import PhoneIcon from '../../assets/Images/ProfileIcons/PhoneIcon';
import Location from '../../assets/Images/ProfileIcons/LocationIcon';
import Lock from '../../assets/Images/ProfileIcons/Lock';
import Header from '../../components/Header';

const EditProfile = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [cnfrmPassword, setCnfrmPassword] = useState('');

  function handleBackButtonClick() {
    console.log('back');
    navigation.navigate('Account');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <View style={{flexGrow: 1, backgroundColor: '#fff'}}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
          {/* header */}
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Icon name="arrow-back-ios" size={20} color="#159DEA" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: '#159DEA',
                borderRadius: 13,
                paddingHorizontal: 12,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {/* <Icon name="edit" size={10} color="#fff" style={{marginRight: 5}} /> */}
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Poppins-Regular',
                  color: '#fff',
                }}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
          {/* profile pic */}
          <View>
            <View style={{position: 'relative', alignSelf: 'center'}}>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 4,
                  borderColor: 'white',
                  overflow: 'hidden',
                  elevation: 5,
                }}>
                <Image
                  source={require('../../assets/Images/img/user.jpg')}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              </View>
              <Pressable
                style={{
                  padding: 8,
                  backgroundColor: '#fff',
                  borderRadius: 100,
                  position: 'absolute',
                  elevation: 5,
                  right: 0,
                  bottom: 10,
                }}>
                <CameraIcon />
              </Pressable>
            </View>
            <Text
              style={{
                color: '#000000',
                fontStyle: 'Poppins-SemiBold',
                textAlign: 'center',
                marginVertical: 15,
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Angelina Jolie
            </Text>
          </View>

          {/* edit-section */}
          <View style={{marginHorizontal: 20, paddingBottom: 20, flex: 1}}>
            <EditInput
              label="Email"
              leftIcon={<EmailIcon />}
              value={email}
              keyboardType="email-address"
              placeholder="angelina@gmail.com"
              placeholderTextColor="#8E8E8E"
              onChangeText={e => setEmail(e)}
            />
            <EditInput
              label="Phone"
              leftIcon={<PhoneIcon />}
              value={number}
              placeholder="+123-123-1234"
              keyboardType="number-pad"
              placeholderTextColor="#8E8E8E"
              onChangeText={e => setNumber(e)}
            />
            <EditInput
              label="Address"
              leftIcon={<Location />}
              // secureTextEntry={false}
              value={location}
              placeholder="1301 Lamy Ln, Monroe, Louisiana,	71201"
              placeholderTextColor="#8E8E8E"
              onChangeText={e => setLocation(e)}
            />
            <EditInput
              label="Password"
              leftIcon={<Lock />}
              value={password}
              placeholder="**********"
              placeholderTextColor="#8E8E8E"
              onChangeText={e => setPassword(e)}
              isPassword={password.length !== 0 ? true : false}
            />
            <EditInput
              label="Re Enter Password"
              leftIcon={<Lock />}
              value={cnfrmPassword}
              placeholder="**********"
              placeholderTextColor="#8E8E8E"
              onChangeText={e => setCnfrmPassword(e)}
              isPassword={cnfrmPassword.length !== 0 ? true : false}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
