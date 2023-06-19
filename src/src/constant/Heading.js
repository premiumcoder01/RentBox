import {Text, View} from 'react-native';
import React from 'react';

const Heading = (props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          color: '#159DEA',
          textAlign: 'center',
          fontFamily: 'Poppins-ExtraBold',
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default Heading;
