import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {createRef, useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import PInput from '../../constant/PInput';
import Button from '../../constant/Button';
import Header from '../../components/Header';
import Toaster from '../../../Component/Toaster';
import Lottie from 'lottie-react-native';
const actionSheetRef = createRef();
const Help = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMesaage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (name == '' || email == '' || message == '') {
      Toaster('Please fill all the required field');
      return;
    }
    setVisible(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
      <Header />

      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <SubHeading title="Need Help ?" onPress={() => navigation.goBack()} />
        <View style={{position: 'relative', marginBottom: 20}}>
          <Image source={require('./img/Help.png')} style={{width: '100%'}} />
          <Text
            style={{
              position: 'absolute',
              fontSize: 15,
              lineHeight: 19,
              fontFamily: 'Poppins-SemiBold',
              color: '#159DEA',
              left: 20,
              top: 40,
            }}>
            Need Some Help
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              position: 'absolute',
              left: 20,
              top: 70,
            }}>
            Lorem ipsum dolor si...
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 30,
            paddingVertical: 12,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            backgroundColor: '#fff',
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book,{' '}
            <TouchableOpacity>
              <Text style={{color: '#159DEA', fontWeight: 'bold'}}>
                support@brightdealers.com
              </Text>
            </TouchableOpacity>
          </Text>

          <View>
            <Text
              style={{
                color: '#159DEA',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                marginBottom: 20,
              }}>
              Support
            </Text>
            <Text
              style={{
                color: '#666666',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                lineHeight: 16,
                marginBottom: 20,
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            {/* form */}
            <View style={{borderWidth: 0}}>
              <PInput
                value={name}
                onChangeText={e => setName(e)}
                placeholder="Name"
                extraStyle={{marginHorizontal: 0}}
              />
              <PInput
                value={email}
                onChangeText={e => setEmail(e)}
                placeholder="Email"
                extraStyle={{marginHorizontal: 0}}
              />
              <PInput
                value={message}
                onChangeText={e => setMesaage(e)}
                placeholder="Message"
                extraStyle={{
                  marginHorizontal: 0,
                  width: '100%',
                  borderRadius: 20,
                }}
                extraTextStyle={{
                  fontSize: 13,
                  height: 150,
                  paddingTop: 10,
                  textAlignVertical: 'top',
                }}
                multiline={true}
              />
              <Button value="Submit" onPress={() => handleSubmit()} />
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Lottie
              source={require('../../assets/Images/message.json')}
              autoPlay
              loop
              autoSize
              style={{width: 100}}
            />
            <Text
              style={{
                color: '#4966E9',
                fontFamily: 'Poppins-SemiBold',
                marginBottom: 20,
                fontWeight: 'bold',
              }}>
              Your Request has been send Sucessfully
            </Text>
            <Button
              value="Close"
              containerStyle={{paddingHorizontal: 100}}
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'transparent',
    elevation: 5,
  },
});
