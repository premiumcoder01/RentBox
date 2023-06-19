import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import MoreIcon from '../../assets/Images/MoreIcon';
import AttachIcon from '../../assets/Images/AttachIcon';
import SendIcon from '../../assets/Images/SendIcon';

const ChatInBox = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 80}}>
      <SubHeading title="Chat Inbox" onPress={() => navigation.navigate("Chat")} />

      <ImageBackground
        source={require('../../assets/Images/img/chat.jpg')}
        borderRadius={25}
        imageStyle={{borderRadius: 25}}
        resizeMode="cover"
        style={{
          marginHorizontal: 20,
          marginVertical: 10,

          borderColor: '#EBEBEB',
          flex: 1,
          borderWidth: 1,
          borderRadius: 25,
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
            top: 0,
            width: '100%',
            zIndex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              Alex
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
            marginHorizontal: 20,
            paddingVertical: 50,
            flexGrow: 1,
          }}>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>ss</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
        </ScrollView>

        {/* chat input section  */}
        <View
          style={{
            padding: 5,
            backgroundColor: '#EDEDED',
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
            elevation: 2,
          }}>
          <TextInput
            value={value}
            onChangeText={e => setValue(e)}
            placeholder="Type message"
            placeholderTextColor="#BFBFBF"
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              color: '#BFBFBF',
              marginLeft: 15,
              flex: 1,
              fontWeight: 'bold',
              padding: 0,
            }}
          />
          <AttachIcon style={{marginRight: 10}} />
          <SendIcon />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatInBox;

const styles = StyleSheet.create({});
