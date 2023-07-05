import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatRecieveBox = props => {
  return (
    <View style={{alignSelf: 'flex-start', position: 'relative'}}>
      <Text style={styles.chatBox}>{props.text}</Text>
      <View style={styles.triangleShape} />
    </View>
  );
};

export default ChatRecieveBox;

const styles = StyleSheet.create({
  triangleShape: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#33AD66',
    transform: [{rotate: '90deg'}],
    bottom: 15,
  },
  chatBox: {
    padding: 4,
    backgroundColor: '#33AD66',
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
});
