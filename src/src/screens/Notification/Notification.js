import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const Notification = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading
        title="Notifications"
        onPress={() => navigation.navigate('MainScreen')}
      />
      <View style={{marginHorizontal: 20}}>
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
          }}>
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
                You have message from Alex
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

export default Notification;
