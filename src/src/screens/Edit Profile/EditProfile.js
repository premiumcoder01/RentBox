import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import CameraIcon from '../../assets/Images/ProfileIcons/CameraIcon';
import EditInput from './EditInput';
import EmailIcon from '../../assets/Images/ProfileIcons/EmailIcon';
import PhoneIcon from '../../assets/Images/ProfileIcons/PhoneIcon';
import Location from '../../assets/Images/ProfileIcons/LocationIcon';
import Header from '../../components/Header';
import User from '../../assets/Images/ProfileIcons/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Geocode from 'react-geocode';
import ActionSheet from 'react-native-actions-sheet';
import Button from '../../constant/Button';
import TitleText from '../Home/images/components/TitleText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  checkEmail,
  checkForEmptyKeys,
  checkString,
} from '../../utils/Validation';
import Constants from '../../utils/Constant';
import Loader from '../../constant/Loader';
import Toaster from '../../../Component/Toaster';
import {GetApi} from '../../utils/Api';

const selectionCamera = createRef();

const EditProfile = () => {
  const navigation = useNavigation();
  const data = useRoute();

  const [location, setLocation] = useState({});

  const [profileObj, setProfileObj] = useState({
    name: data.params.data.first_name,
    phone: data.params.data.phone,
    email: data.params.data.email,
    address: data.params.data.address,
  });
  const [showList, setShowList] = useState(false);
  const [prediction, setPredictions] = useState([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [filedCheck, setfiledCheck] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [image, setimage] = useState();

  const getProfileData = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    setUserDetail(JSON.parse(user));
    if (JSON.parse(user).user_id !== undefined) {
      getProfile(JSON.parse(user).user_id);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfile = id => {
    setLoading(true);
    GetApi(`getProfileById?id=${id}`).then(
      async res => {
        setLoading(false);
        if (res.status == 200) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
          setUserDetail(res.data);
          if (res.data !== null) {
            setProfileObj({
              name: res?.data?.first_name !== null ? res.data.first_name : '',
              phone: res?.data?.phone !== null ? res.data.phone : '',
              email: res?.data?.email !== null ? res.data.email : '',
              address: res?.data?.address !== null ? res.data.address : '',
              type: res?.data?.type !== null ? res.data.type : '',
            });
          }

          setLocation({
            lat: res?.data?.latitude !== null ? res.data.latitude : '',
            lng: res?.data?.longitude !== null ? res.data.longitude : '',
          });

          setimage(
            res?.data?.image !== null
              ? `${Constants.imageUrl}images/${res.data.image}`
              : '',
          );
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  const saveChange = () => {
    let {anyEmptyInputs} = checkForEmptyKeys(profileObj);
    setfiledCheck(anyEmptyInputs);
    if (anyEmptyInputs.length > 0) {
      // Toaster(errorString);
    } else {
      const emailcheck = checkEmail(profileObj.email);
      if (!emailcheck) {
        Toaster('Your email id is invalid');
        return;
      }
      if (checkString(profileObj.name)) {
        Toaster('Special character and Number not allowed in name field');
        return;
      }
      if (profileObj.phone.length < 12) {
        Toaster('Invalid Mobile number');
        return;
      }
      if (
        location.lat === '' ||
        location.lat === undefined ||
        location.lng === '' ||
        location.lng === undefined
      ) {
        Toaster('Please select location from list');
        return;
      }
      try {
        //without imageFile
        const d = [
          {
            name: 'first_name',
            data: profileObj.name,
          },
          {
            name: 'email',
            data: profileObj.email,
          },
          {
            name: 'phone',
            data: profileObj.phone.toString(),
          },
          {
            name: 'id',
            data: userDetail.user_id.toString(),
          },
          {
            name: 'address',
            data: profileObj.address,
          },
          {
            name: 'latitude',
            data: location.lat.toString(),
          },
          {
            name: 'longitude',
            data: location.lng.toString(),
          },
        ];
        //with imageFile
        const e = [
          imageFile,
          {
            name: 'first_name',
            data: profileObj.name,
          },
          {
            name: 'email',
            data: profileObj.email,
          },
          {
            name: 'phone',
            data: profileObj.phone.toString(),
          },
          {
            name: 'id',
            data: userDetail.user_id.toString(),
          },
          {
            name: 'address',
            data: profileObj.address,
          },
          {
            name: 'latitude',
            data: location.lat.toString(),
          },
          {
            name: 'longitude',
            data: location.lng.toString(),
          },
        ];
        if (imageFile !== undefined) {
          console.log('data with image', e);
          setLoading(true);
          RNFetchBlob.fetch(
            'POST',
            `${Constants.baseUrl}update_user`,
            {
              'Content-Type': 'multipart/form-data',
            },
            e,
          )
            .then(resp => {
              setLoading(false);
              if (JSON.parse(resp.data).status == 200) {
                Toaster(JSON.parse(resp.data).message);

                getProfile(userDetail.user_id);
                navigation.navigate('Profile');
              }
            })
            .catch(err => {
              setLoading(false);
            });
        } else {
          console.log('data without image', d);
          setLoading(true);
          RNFetchBlob.fetch(
            'POST',
            `${Constants.baseUrl}update_user`,
            {
              'Content-Type': 'multipart/form-data',
            },
            d,
          )
            .then(resp => {
              setLoading(false);
              if (JSON.parse(resp.data).status == 200) {
                Toaster(JSON.parse(resp.data).message);

                getProfile(userDetail.user_id);
                navigation.navigate('Profile');
              }
            })
            .catch(err => {
              setLoading(false);
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(PermissionsAndroid.RESULTS.GRANTED, granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const GOOGLE_PACES_API_BASE_URL =
    'https://maps.googleapis.com/maps/api/place';

  const GooglePlacesInput = async text => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=AIzaSyDkAmiEffMR4r0r9zziv66pyEGNJSSnGN0&input=${text}`;
    try {
      const check = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (check) {
        setShowList(true);
        const result = await axios.request({
          method: 'post',
          url: apiUrl,
        });
        if (result) {
          const {
            data: {predictions},
          } = result;
          setPredictions(predictions);
          setShowList(true);
        }
      } else {
        getLocation();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkLocation = async add => {
    try {
      Geocode.setApiKey('AIzaSyDkAmiEffMR4r0r9zziv66pyEGNJSSnGN0');
      if (add) {
        Geocode.fromAddress(add).then(
          response => {
            console.log(response.results[0].geometry.location);
            const lat = response.results[0].geometry.location;
            setLocation(lat);
          },
          error => {
            console.error(error);
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const launchCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        mediaType: 'photo',
        cropping: true,
      }).then(image => {
        const data = {
          name: 'image',
          filename: image.path.toString(),
          type: image.mime,
          data: RNFetchBlob.wrap(image.path),
        };
        setimage(image.path);
        setImageFile(data);
      });
    }, 500);
  };

  const launchImageLibrary = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        const data = {
          name: 'image',
          filename: image.path.toString(),
          type: image.mime,
          data: RNFetchBlob.wrap(image.path),
        };
        console.log(data, '====>');
        setimage(image.path);
        setImageFile(data);
      });
    }, 500);
  };

  return (
    <View style={{flexGrow: 1, backgroundColor: '#fff'}}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flexGrow: 1, backgroundColor: '#fff', paddingBottom: 80}}>
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
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon name="arrow-back-ios" size={20} color="#159DEA" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: '#159DEA',
                borderRadius: 13,
                paddingHorizontal: 12,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => saveChange()}>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Poppins-Regular',
                  color: '#fff',
                }}>
                Save Changes
              </Text>
            </TouchableOpacity> */}
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
                  source={
                    image !== ''
                      ? {uri: image}
                      : require('../../assets/Images/img/images.png')
                  }
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
                }}
                onPress={() => {
                  selectionCamera.current?.show();
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
              {profileObj.name}
            </Text>
          </View>

          {/* edit-section */}
          <View style={{marginHorizontal: 20, paddingBottom: 20, flex: 1}}>
            <EditInput
              label="Name"
              leftIcon={<User />}
              value={profileObj.name}
              placeholder="Enter your name"
              placeholderTextColor="#8E8E8E"
              onChangeText={text => setProfileObj({...profileObj, name: text})}
            />
            {filedCheck.includes('NAME') && (
              <Text style={{color: 'red', fontSize: 12}}>
                {' '}
                Name id is required
              </Text>
            )}
            <EditInput
              label="Email"
              leftIcon={<EmailIcon />}
              value={profileObj.email}
              keyboardType="email-address"
              placeholder="angelina@gmail.com"
              placeholderTextColor="#8E8E8E"
              onChangeText={text => setProfileObj({...profileObj, email: text})}
            />
            {filedCheck.includes('EMAIL') && (
              <Text style={{color: 'red', fontSize: 12}}>
                {' '}
                Email id is required
              </Text>
            )}
            <EditInput
              label="Phone"
              leftIcon={<PhoneIcon />}
              value={profileObj.phone}
              placeholder="+123-123-1234"
              keyboardType="number-pad"
              placeholderTextColor="#8E8E8E"
              onChangeText={text => setProfileObj({...profileObj, phone: text})}
            />
            {filedCheck.includes('PHONE') && (
              <Text style={{color: 'red', fontSize: 12}}>
                {' '}
                Mobile number is required
              </Text>
            )}
            <EditInput
              label="Address"
              leftIcon={<Location />}
              value={profileObj.address}
              placeholder="1301 Lamy Ln, Monroe, Louisiana,	71201"
              placeholderTextColor="#8E8E8E"
              onChangeText={text => {
                GooglePlacesInput(text);
                setProfileObj({...profileObj, address: text});
              }}
            />

            {filedCheck.includes('ADDRESS') && (
              <Text style={{color: 'red'}}> Address is required</Text>
            )}
            {prediction != '' && showList && (
              <View style={prediction && styles.list}>
                {prediction.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: 'lightgrey',
                    }}>
                    <Ionicons
                      name="location"
                      size={18}
                      color="#1D1D1D"
                      style={{marginHorizontal: 5}}
                    />
                    <Text
                      style={styles.item}
                      onPress={() => {
                        console.log(item);
                        setAddress(item.description);
                        checkLocation(item.description);
                        setShowList(false);
                        setProfileObj({
                          ...profileObj,
                          address: item.description,
                        });
                      }}>
                      {item.description}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <Button
            value="Save Changes"
            textStyle={{fontSize: 15}}
            onPress={() => saveChange()}
            containerStyle={{marginVertical: 0}}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <ActionSheet
        ref={selectionCamera}
        containerStyle={{
          backgroundColor: '#F5F5F5',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <View style={{paddingHorizontal: 20, paddingTop: 15}}>
          <TitleText title="Choose your photo" color="#159DEA" />

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginVertical: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              launchCamera();
              selectionCamera.current?.hide();
            }}>
            <Image
              source={require('../../assets/Images/img/camera.png')}
              resizeMode="contain"
              style={{height: 30, width: 30}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  fontWeight: '500',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Take a Picture
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              launchImageLibrary();
              selectionCamera.current?.hide();
            }}>
            <Image
              source={require('../../assets/Images/img/gallery.png')}
              resizeMode="contain"
              style={{height: 30, width: 30}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  fontWeight: '500',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Choose from gallery
              </Text>
            </View>
          </TouchableOpacity>
          <Button
            value="Cancel"
            containerStyle={{
              marginHorizontal: 0,
              padding: 5,
              backgroundColor: '#159DEA',
            }}
            textStyle={{fontSize: 15}}
            onPress={() => {
              selectionCamera.current?.hide();
            }}
          />
        </View>
      </ActionSheet>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  list: {
    marginVertical: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
  },
  item: {
    fontSize: 16,
    height: 'auto',
    marginVertical: 5,
    fontFamily: 'Mulish-SemiBold',
    width: Dimensions.get('window').width - 100,
    flexWrap: 'wrap',
  },
});
