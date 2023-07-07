import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import SubHeading from '../../constant/SubHeading';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import {GetApi, Post} from '../../utils/Api';
import Loader from '../../constant/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../utils/Constant';

const Chat = props => {
  const [select, setSelect] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);

  const Focused = useIsFocused();

  const type = [
    {
      id: 1,
      text: 'All',
    },
    {
      id: 2,
      text: 'Rent',
    },
    {
      id: 3,
      text: 'Buy',
    },
  ];
  const navigation = useNavigation();

  const getChatData = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    // setLoading(true);
    GetApi(`getChatData?id=${JSON.parse(userInfo).user_id}`).then(
      async res => {
        if (res.status == 200) {
          // setLoading(false);

          setChatList(res.data);
        }
      },
      err => {
        // setLoading(false);
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getChatData();
  }, [Focused]);

  const handleChat = (chatId, userid, item) => {
    const data = {
      current_user_id: userid,
      receiver_id: chatId,
    };

    Post(`chatClick`, data).then(
      async res => {
        if (res.status == 200) {
          navigation.navigate('ChatInbox', {
            user_id: item.receiver_id,
            user_image: item.image,
            user_name: item.first_name,
          });
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading
        title="Chat"
        onPress={() => navigation.navigate('MainScreen')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 15,
        }}>
        {type.map((item, index) => (
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: select === index ? '#159DEA' : '#F3F3F3',
              borderRadius: 12,
              width: 80,
              marginRight: 5,
            }}
            onPress={() => setSelect(index)}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
                color: select === index ? '#fff' : '#4A4A4A',
                fontWeight: 'bold',
              }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderRadius: 25,
          borderColor: '#EBEBEB',
          marginHorizontal: 20,
          minHeight: 450,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: '#F3F3F3',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            value={searchText}
            onChangeText={e => setSearchText(e)}
            placeholder="search by name"
            placeholderTextColor="#787878"
            style={{
              color: '#787878',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              flex: 1,
              // height: 40,
              padding: 0,
              marginHorizontal: 5,
            }}
          />
          <View style={{padding: 5, backgroundColor: '#fff', borderRadius: 50}}>
            <Image source={require('../../assets/Images/img/search.png')} />
          </View>
        </View>
        {chatList.map(item => {
          return (
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#EBEBEB',
                borderRadius: 30,
                marginTop: 8,
                flexDirection: 'row',
                // justifyContent: 'space-between',
              }}
              onPress={() =>
                handleChat(item.receiver_id, item.sender_id, item)
              }>
              <Image
                source={
                  item?.image !== null
                    ? {
                        uri: `${Constants.imageUrl}images/${item.image}`,
                      }
                    : require('../../assets/Images/img/images.png')
                }
                resizeMode="contain"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                }}
              />
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 13,
                      marginLeft: 10,
                    }}>
                    {item.first_name}
                  </Text>
                  <Text
                    style={{
                      color: '#666666',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 9,
                      marginRight: 10,
                      fontWeight: 'bold',
                    }}>
                    {item.created_at}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#666666',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 12,
                    marginLeft: 10,
                  }}>
                  {item.message.length > 20
                    ? item.message.slice(0, 25).concat('....')
                    : item.message}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
