import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CartIcon from '../../assets/Images/CartIcon';
import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import TitleIcon from '../../assets/Images/TitleIcon';
import OnBoardingCircle from '../../assets/Images/OnBoardingCircle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {
  const Topic = 'Rent  |  Sell  |  Wholesale';
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();

  const userDetail = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
 
    setUser(JSON.parse(userInfo));
  };

  useEffect(() => {
    userDetail();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 130, alignItems: 'center'}}>
        <TitleIcon />
      </View>
      <View style={{position: 'relative'}}>
        <OnBoardingCircle />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 40,
          }}>
          <CartIcon
            style={{marginTop: 100, marginBottom: 35, alignSelf: 'center'}}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 10,
              paddingHorizontal: 50,
              borderRadius: 100,
              alignSelf: 'center',
            }}
            onPress={() => {
              !user ? navigation.navigate('Login') : navigation.navigate('Tab');
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#159DEA',
                fontFamily: 'Poppins-Bold',
                lineHeight: 27,
              }}>
              GET STARTED
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              paddingBottom: 12,
              paddingTop: 50,
            }}>
            <View
              style={{
                height: 1,
                backgroundColor: '#FFFFFF',
                marginBottom: 12,
                opacity: 0.25,
                marginHorizontal: 30,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                color: 'white',
              }}>
              {Topic}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
