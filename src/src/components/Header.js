import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/Images/Logo';
import SearchIcon from '../assets/Images/SearchIcon';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 20,
        paddingLeft: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 1,
        backgroundColor: '#fff',
        elevation: 5,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <SearchIcon />
      </TouchableOpacity>
      <Pressable onPress={() => navigation.navigate('MainScreen')}>
        <Logo />
      </Pressable>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Icon name="notifications" color={'#159DEA'} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
