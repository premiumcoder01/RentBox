import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation, useRoute} from '@react-navigation/native';
import MoreIcon from '../../assets/Images/MoreIcon';
import AttachIcon from '../../assets/Images/AttachIcon';
import SendIcon from '../../assets/Images/SendIcon';
import ChatSendTextBox from '../../components/ChatSendTextBox';
import ChatRecieveBox from '../../components/ChatRecieveBox';
import {GetApi} from '../../utils/Api';
import Constants from '../../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import RNFetchBlob from 'rn-fetch-blob';
import TitleText from '../Home/images/components/TitleText';
import Button from '../../constant/Button';

const selectionCamera = createRef();

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ChatInBox = props => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const data = props?.route?.params;
  const [chatList, setChatList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [image, setimage] = useState('');

  const getUserDetail = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    setUserDetail(JSON.parse(userInfo));
    getChatList(JSON.parse(userInfo).user_id, data.user_id);
  };

  const getChatList = id => {
    GetApi(`getMessageData?sender_id=${id}&receiver_id=${data.user_id}`).then(
      async res => {
        if (res.status == 200) {
          setChatList(res.data);
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const sendMessage = () => {
    try {
      const d = [
        {
          name: 'sender_id',
          data: userDetail.user_id.toString(),
        },
        {
          name: 'receiver_id',
          data: data.user_id.toString(),
        },
      ];
      if (!!imageFile.data) {
        d.push(imageFile);
      }
      if (!!message) {
        d.push({
          name: 'new_message',
          data: message,
        });
      }
      RNFetchBlob.fetch(
        'POST',
        `${Constants.baseUrl}postMessage`,
        {
          'Content-Type': 'multipart/form-data',
        },
        d,
      )
        .then(resp => {
          if (JSON.parse(resp.data).status == 200) {
            getChatList(userDetail.user_id, data.user_id);
            setimage('');
            setImageFile({});
            setMessage('');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getUserDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const launchCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: false,
      // multiple: true,
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
  };

  const launchImageLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
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
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 0}}>
      <SubHeading
        title="Chat Inbox"
        onPress={() => navigation.goBack()}
        paddingVertical={15}
      />

      <ImageBackground
        source={require('../../assets/Images/img/chat.jpg')}
        resizeMode="cover"
        style={{
          borderColor: '#EBEBEB',
          flex: 1,
          borderWidth: 1,
          padding: 20,
        }}>
        {/* inbox header */}
        <View
          style={{
            padding: 5,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: '#EBEBEB',
            borderRadius: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 3,
            position: 'absolute',
            top: 5,
            left: 10,
            right: 10,
            zIndex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {data?.user_image !== '' ? (
              <Image
                source={{
                  uri: `${Constants.imageUrl}images/${data.user_image}`,
                }}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/Images/img/user.jpg')}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />
            )}

            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              {data.user_name}
            </Text>
          </View>
          <TouchableOpacity style={{marginRight: 10}}>
            <MoreIcon />
          </TouchableOpacity>
        </View>
        {/* chat section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 40,
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {chatList.map(item => {
            return (
              <View key={item.id}>
                {userDetail.user_id != item.sender_id && (
                  <View>
                    {item.message != undefined && item.message != '' && (
                      <ChatRecieveBox text={item.message} />
                    )}
                    {item.image != undefined && item.image != '' && (
                      <Image
                        source={{
                          uri: Constants.imageUrl + 'images/' + item.image,
                        }}
                        style={{
                          height: 150,
                          width: 150,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          marginBottom: 5,
                        }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                )}
                {userDetail.user_id == item.sender_id && (
                  <View>
                    {item.message != undefined && item.message != '' && (
                      <ChatSendTextBox text={item.message} />
                    )}
                    {item.image != undefined && item.image != '' && (
                      <Image
                        source={{
                          uri: Constants.imageUrl + 'images/' + item.image,
                        }}
                        style={{
                          height: 150,
                          width: 150,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          marginBottom: 5,
                          alignSelf: 'flex-end',
                        }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* chat input section  */}
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            left: 10,
            right: 10,
            zIndex: 1,
            elevation: 8,
          }}>
          {/* camera option */}
          {image !== '' && (
            <View
              style={{
                padding: 5,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginBottom: 3,
              }}>
              <Image
                source={{uri: image}}
                style={{height: 100, width: 100, borderRadius: 5}}
                resizeMode="contain"
              />
            </View>
          )}
          <View
            style={{
              padding: 5,
              backgroundColor: '#EDEDED',
              borderRadius: 30,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={message}
              multiline={true}
              onChangeText={e => setMessage(e)}
              placeholder="Type message"
              placeholderTextColor="#BFBFBF"
              autoCorrect={false}
              selectTextOnFocus={false}
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                color: '#000000',
                marginLeft: 15,
                flex: 1,
                fontWeight: 'bold',
                padding: 0,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                selectionCamera.current?.show();
              }}>
              <AttachIcon style={{marginRight: 10}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendMessage()}>
              <SendIcon />
            </TouchableOpacity>
          </View>
          <ActionSheet
            ref={selectionCamera}
            containerStyle={{
              backgroundColor: '#F5F5F5',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}>
            <View style={{paddingHorizontal: 20, paddingTop: 15}}>
              <TitleText title="Choose photo" color="#159DEA" />

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
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatInBox;

const styles = StyleSheet.create({});
