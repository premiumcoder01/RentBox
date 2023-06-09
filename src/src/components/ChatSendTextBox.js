import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatSendTextBox = props => {
  return (
    <View
      style={{alignSelf: 'flex-end', position: 'relative', marginVertical: 10}}>
      <View style={styles.triangleShape} />
      <Text style={styles.chatBox}>{props.text}</Text>
    </View>
  );
};

export default ChatSendTextBox;

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
    borderBottomColor: '#159DEA',
    transform: [{rotate: '-90deg'}],
    // bottom: 12,
    position: 'absolute',
    right: 0,
    bottom: -8,
  },
  chatBox: {
    padding: 7,
    backgroundColor: '#159DEA',
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
});
