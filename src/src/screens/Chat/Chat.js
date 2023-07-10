import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import SubHeading from '../../constant/SubHeading';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import {GetApi, Post} from '../../utils/Api';
import Loader from '../../constant/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../utils/Constant';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Chat = props => {
  const [select, setSelect] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('all');
  const [chatList, setChatList] = useState([]);
  const [filterChatList, setFilterChatList] = useState([]);

  const Focused = useIsFocused();

  const types = [
    {
      id: 1,
      text: 'All',
      value: 'all',
    },
    {
      id: 2,
      text: 'Outgoing',
      value: 'buy',
    },
    {
      id: 3,
      text: 'Incoming',
      value: 'sell',
    },
  ];
  const navigation = useNavigation();

  const getChatData = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    setLoading(true);
    GetApi(
      `getChatData?id=${JSON.parse(userInfo).user_id}&chat_type=${type}`,
    ).then(
      async res => {
        if (res.status == 200) {
          setLoading(false);

          setChatList(res.data);
          setFilterChatList(res.data);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getChatData();
  }, [Focused,type]);

  const handleChat = item => {
    const data = {
      current_user_id: item.receiver_id,
      receiver_id: item.sender_id,
    };
    Post(`chatClick`, data).then(
      async res => {
        if (res.status == 200) {
          console.log(res.data);
          navigation.navigate('ChatInbox', {
            user_id: item.sender_id,
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

  const searchFilterFunction = text => {
    if (text) {
      const newData = chatList.filter(function (item) {
        const itemData = item.first_name
          ? item.first_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterChatList(newData);
      setSearchText(text);
    } else {
      setFilterChatList(chatList);
      setSearchText(text);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getChatData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        {types.map((item, index) => (
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: select === index ? '#159DEA' : '#F3F3F3',
              borderRadius: 12,
              width: 80,
              marginRight: 5,
            }}
            onPress={() => {
              setSelect(index);
              setType(item.value);
            }}>
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
          flex: 1,
          marginBottom: 90,
          // minHeight: 450,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: '#F3F3F3',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 90,
          }}>
          <TextInput
            value={searchText}
            onChangeText={e => searchFilterFunction(e)}
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
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            {filterChatList.map(item => {
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
                  onPress={() => handleChat(item)}>
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
          </ScrollView>
        )}
      </View>
      {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
