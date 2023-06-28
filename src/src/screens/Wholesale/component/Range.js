import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../../../components/RangeSlider';
const Range = props => {
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 100000;

  return (
    <GestureHandlerRootView>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <RangeSlider
            sliderWidth={250}
            min={MIN_DEFAULT}
            max={MAX_DEFAULT}
            step={10}
            onValueChange={range => {
              props.setMinValue(range.min);
              props.setMaxValue(range.max);
            }}
            extraSliderStyle={props.extraSliderStyle}
            extraThumbstyle={props.extraThumbstyle}
          />
          <View style={styles.tableContainer}>
            <View style={{marginBottom: 20}}>
              <Text style={styles.colorBlack}>Min Price</Text>
              <View style={styles.table}>
                <Text style={styles.colorBlack}>${props.minValue}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.colorBlack}>Max Price</Text>
              <View style={styles.table}>
                <Text style={styles.colorBlack}>${props.maxValue}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Range;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
    paddingTop: 20,
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  table: {
    borderColor: '#EBECF2',
    padding: 0,
    marginTop: 2,
    borderRadius: 5,
  },
  colorBlack: {color: 'black', fontSize: 12, fontWeight: 'bold'},
});
