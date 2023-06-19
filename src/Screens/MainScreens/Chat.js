import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl
} from 'react-native';
import React, { useEffect, useState, createRef } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import { Post, GetApi } from '../../Helpers/Service';
import Toaster from '../../Component/Toaster';
import Spinner from '../../Component/Spinner';
import Constants from '../../Helpers/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import RNFetchBlob from 'rn-fetch-blob';

const actionSheetRef = createRef();
const selectionCamera = createRef();

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Chat = props => {
  const { chatUser_id, user_name, user_img } = props?.route?.params;
  // console.log(props);
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [image, setimage] = useState('');
  const [message, setMessage] = useState('');
  const [userDetail, setUserDetail] = useState({});
  const [showDetail, setShoeDetail] = useState(true);

  useEffect(() => {
    getuserDetail();
    if (user_name !== undefined) {
      setHeader();
    }
  }, [props?.route?.params]);

  const setHeader = () => {
    props.navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[styles.backArow, { marginLeft: 0, marginBottom: 0 }]}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <FontAwesome5 name="arrow-left" size={18} color="#fff" />
          </TouchableOpacity>
          <Image
            source={
              user_img != null
                ? { uri: user_img }
                : require('../../assets/Images/holder.png')
            }
            resizeMode='contain'
            style={{height: 35, width: 35,borderRadius:50,marginLeft:10}}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nametext}>{user_name}</Text>
          </View>
        </View>
      ),
    });
  };

  // useEffect(() => {
  // }, []);

  const getuserDetail = async () => {
    const user = await AsyncStorage.getItem('userDetail');
    console.log(JSON.parse(user));
    setUserDetail(JSON.parse(user));
    getChatList(JSON.parse(user).user_id, chatUser_id);
    // if (user === null) {
    //   setShoeDetail(false);
    //   actionSheetRef.current?.setModalVisible();
    // } else
    //  if (
    //   JSON.parse(user).user_id !== undefined &&
    //   props?.route?.params.chatUser_id !== undefined
    // ) {
    //   setShoeDetail(true);
    //   getChatList(JSON.parse(user).user_id, props?.route?.params.chatUser_id);
    //   // getChatList('37');
    // }
    // if (
    //   JSON.parse(user).user_id !== undefined &&
    //   props?.route?.params.chatUser_id !== undefined
    // ) {
    //   getChatList(JSON.parse(user).user_id, props?.route?.params.chatUser_id);

    // }
  };

  const getChatList = id => {
    setLoading(true);
    GetApi(`getMessageData?sender_id=${id}&receiver_id=${chatUser_id}`).then(
      async res => {
        setLoading(false);
        console.log(res);
        if (res.status == 200) {
          console.log(res.data);
          setChatList(res.data);
          // getProfile(props?.route?.params.chatUser_id);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };
  const getProfile = id => {
    setLoading(true);
    GetApi(`getProfileById?id=${id}`).then(
      async res => {
        setLoading(false);
        console.log(res);
        if (res.status == 200) {
          console.log(res.data);
          setHeader(res.data);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  const submit = () => {
    try {
      const d = [
        {
          name: 'sender_id',
          data: userDetail.user_id.toString(),
        },
        {
          name: 'receiver_id',
          data: props?.route?.params.chatUser_id.toString(),
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
      console.log('data=>', d);
      setLoading(true);
      RNFetchBlob.fetch(
        'POST',
        `${Constants.baseUrl}postMessage`,
        {
          'Content-Type': 'multipart/form-data',
        },
        d,
      )
        .then(resp => {
          console.log('res============>', resp.data);
          setLoading(false);
          if (JSON.parse(resp.data).status == 200) {
            getChatList(userDetail.user_id, chatUser_id);
            // Toaster(JSON.parse(resp.data).message);
            setimage('');
            setImageFile({});
            setMessage('');
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    // }
  };

  const launchCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: false,
      // multiple: true,
    }).then(image => {
      console.log(image);
      const data = {
        name: 'image',
        filename: image.path.toString(),
        type: image.mime,
        data: RNFetchBlob.wrap(image.path),
      };
      setimage(image.path);
      console.log(data);
      setImageFile(data);
    });
  };

  const launchImageLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
    }).then(image => {
      console.log(image);
      const data = {
        name: 'image',
        filename: image.path.toString(),
        type: image.mime,
        data: RNFetchBlob.wrap(image.path),
      };
      setimage(image.path);
      console.log(data);
      setImageFile(data);
    });
  };

  // const launchImageLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary(options, response => {
  //     console.log('Response = ', response.base64);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = {uri: response.uri};
  //       console.log('response', JSON.stringify(response));
  //       const data = {
  //         name: 'image',
  //         filename: response.assets[0].uri.toString(),
  //         type: response.assets[0].type,
  //         data: RNFetchBlob.wrap(response.assets[0].uri),
  //       };
  //       setimage(response.assets[0].uri);
  //       console.log(data);
  //       setImageFile(data);
  //     }
  //   });
  // };

  // const launchCamera = async () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, async response => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = {uri: response.uri};
  //       console.log('response', JSON.stringify(response));
  //       const data = {
  //         name: 'image',
  //         filename: response.assets[0].uri.toString(),
  //         type: response.assets[0].type,
  //         data: RNFetchBlob.wrap(response.assets[0].uri),
  //       };
  //       setimage(response.assets[0].uri);
  //       console.log(data);
  //       setImageFile(data);
  //     }
  //   });
  // };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const user = await AsyncStorage.getItem('userDetail');
    getChatList(JSON.parse(user).user_id, chatUser_id);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner color={'#fff'} visible={loading} />
      <View style={{ backgroundColor: '#E6E6E6', paddingHorizontal: 20 }}>
        <Text style={styles.text}>Apple, Light blue, 29/03/2022</Text>
      </View>
      <KeyboardAvoidingView
        // behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        >
        <View style={{ flex: 1}}>
          <ScrollView
          showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ paddingHorizontal: 20 ,flex:1}}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            >
            {chatList.map(item => (
              <View key={item.id}>
                {userDetail.user_id != item.sender_id && (
                  <View style={styles.recivedView}>
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
                          borderBottomLeftRadius: 0,
                          marginBottom: 5,
                        }}
                        resizeMode="contain"
                      />
                    )}
                    {item.message != undefined && item.message != '' && (
                      <View>
                        <Text style={styles.recivedMsg}>{item.message}</Text>
                      </View>
                    )}
                    <Text style={styles.recivedtime}>
                      {moment(item.created_at).format('h:mm A')}
                    </Text>
                  </View>
                )}
                {userDetail.user_id == item.sender_id && (
                  <View style={styles.sendView}>
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
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 10,
                          marginBottom: 5,
                        }}
                        resizeMode="contain"
                      />
                    )}
                    {item.message != undefined && item.message != '' && (
                      <View>
                        <Text style={styles.sendMsg}>{item.message}</Text>
                      </View>
                    )}
                    <Text style={styles.sendtime}>
                      {moment(item.created_at).format('h:mm A')}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {showDetail && (
          <View style={[styles.postBox, { flexDirection: 'column' }]}>
            <View style={{ alignItems: 'flex-end' }}>
              {image !== '' && (
                <Image
                  source={{ uri: image }}
                  style={{ height: 150, width: 150, borderRadius: 5 }}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.postBox}>
              <View style={{ flex: 1}}>
                <TextInput
                  placeholder="Type a message"
                  multiline={true}
                  // numberOfLines={3}
                  // textAlignVertical="top"
                  placeholderTextColor={'#666666'}
                  value={message}
                  onChangeText={text => {
                    setMessage(text);
                  }}
                  //autoComplete={false}
                  autoCorrect={false}
                  selectTextOnFocus={false}
                />
              </View>
              <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    selectionCamera.current?.show();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                  }}>
                  <FontAwesome5 name="paperclip" size={22} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    submit();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                  }}>
                  <FontAwesome5 name="paper-plane" size={22} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>

      <ActionSheet
        ref={selectionCamera}
        containerStyle={{ backgroundColor: '#F5F5F5' }}>
        {/* <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', width: 50, height: 5, borderRadius: 25, marginTop: 10, textAlign: 'center' }}></View>
                </View> */}

        <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 20,
              }}>
              Choose your photo
            </Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: 'row', width: '100%' }}
            onPress={() => {
              launchCamera();
              selectionCamera.current?.hide();
            }}>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  opacity: 0.7,
                }}>
                Take a Picture
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: 10 }}
            onPress={() => {
              launchImageLibrary();
              selectionCamera.current?.hide();
            }}>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  opacity: 0.7,
                }}>
                Choose from gallery
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'flex-end',
            }}
            onPress={() => {
              selectionCamera.current?.hide();
            }}>
            <View style={{ marginLeft: 10, width: '100%' }}>
              <Text
                style={{
                  color: '#850631',
                  fontSize: 18,
                  fontWeight: '500',
                  textAlign: 'right',
                  marginRight: 20,
                }}>
                CANCEL
              </Text>
            </View>
          </TouchableOpacity>

          {/* </RadioButton.Group> */}
        </View>
      </ActionSheet>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ backgroundColor: '#fff' }}>
        <View style={styles.actionMainView}>
          <View
            style={{
              backgroundColor: '#4AAB7E',
              width: 50,
              height: 5,
              borderRadius: 25,
              marginBottom: 30,
            }}></View>

          <Text style={{ color: '#4AAB7E', fontSize: 16 }}>
            Please login to Chat
          </Text>
          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() => {
              props.navigation.navigate('Signin');
              actionSheetRef.current?.hide();
            }}>
            <Text style={styles.actionBtn}>Login</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: '#4AAB7E',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionMainView: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  postBox: {
    // height: 85,
    backgroundColor:"white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems:"center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  sendtime: {
    color: '#666666',
    fontSize: 10,
    paddingVertical: 5,
    fontFamily: 'Mulish-Bold',
  },
  sendMsg: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
    backgroundColor: '#DFF9EC',
    maxWidth: '60%',
    // width: 100,
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 10,
  },
  sendView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 10,
    // maxWidth: '60%',
  },

  recivedtime: {
    color: '#666666',
    fontSize: 10,
    paddingVertical: 5,
    fontFamily: 'Mulish-Bold',
  },
  recivedMsg: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
    backgroundColor: '#E6E6E6',
    maxWidth: '60%',
    // width: 100,
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 0,
  },
  recivedView: {
    marginBottom: 10,
    alignItems: 'baseline',
    // maxWidth: '60%',
  },
  text: {
    paddingVertical: 10,
    color: '#666666',
    fontFamily: 'Mulish-Medium',
  },
  nametext: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mulish-Bold',
    // marginBottom: 10,
  },

  backArow: {
    backgroundColor: '#9AC96D',
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 30,
    marginLeft: 20,
  },
  avatar: {
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default Chat;
