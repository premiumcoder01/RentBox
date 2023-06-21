import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';

const Chat = () => {
  const [select, setSelect] = useState(0);
  const [searchText, setSearchText] = useState('');

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
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SubHeading title="Chat" onPress={() => navigation.navigate("MainScreen")} />
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
          height: 500,
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
              padding:0,
              marginHorizontal: 5,
            }}
          />
          <View
            style={{padding: 5, backgroundColor: '#fff', borderRadius: 50}}>
            <Image source={require('../../assets/Images/img/search.png')} />
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: 30,
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.navigate('ChatInbox')}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/Images/img/user.jpg')}
              resizeMode="contain"
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 13,
                }}>
                Alex
              </Text>
              <Text
                style={{
                  color: '#666666',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Hii Amelo... How r u ?
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#666666',
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                marginRight: 10,
              }}>
              9:00AM
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: 30,
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.navigate('ChatInbox')}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/Images/img/user.jpg')}
              resizeMode="contain"
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 13,
                }}>
                Alex
              </Text>
              <Text
                style={{
                  color: '#666666',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Hii Amelo... How r u ?
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#666666',
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                marginRight: 10,
              }}>
              9:00AM
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
