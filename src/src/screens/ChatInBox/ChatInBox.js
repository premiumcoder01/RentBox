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
import ChatSendTextBox from '../../components/ChatSendTextBox';
import ChatRecieveBox from '../../components/ChatRecieveBox';
import Header from '../../components/Header';

const ChatInBox = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [change, setChange] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 0}}>
      <SubHeading
        title="Chat Inbox"
        onPress={() => navigation.navigate('Chat')}
        paddingVertical={15}
      />

      <ImageBackground
        source={require('../../assets/Images/img/chat.jpg')}
        // borderRadius={25}
        // imageStyle={{borderRadius: 25}}
        resizeMode="cover"
        style={{
          // marginHorizontal: 20,
          // marginTop: 10,
          borderColor: '#EBEBEB',
          flex: 1,
          borderWidth: 1,
          padding: 20,
          // borderRadius: 20,
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
            // marginHorizontal: 10,
            paddingVertical: 40,
            flexGrow: 1,
          }}>
          <ChatRecieveBox text="How are you ?" />
          <ChatSendTextBox text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
          <ChatRecieveBox text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
          <ChatSendTextBox text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
          <ChatRecieveBox text="How are you ?" />
          <ChatSendTextBox text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing." />
          <ChatRecieveBox text=" It was popularised in the 1960s with the release of Letraset sheets containing." />
          <ChatSendTextBox text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
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
            bottom: 5,
            left: 10,
            right: 10,
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
          <TouchableOpacity>
            <AttachIcon style={{marginRight: 10}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatInBox;

const styles = StyleSheet.create({});
