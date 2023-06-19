import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../../../components/RangeSlider';
const Range = props => {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 5000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <RangeSlider
              sliderWidth={155}
              min={MIN_DEFAULT}
              max={MAX_DEFAULT}
              step={10}
              onValueChange={range => {
                setMinValue(range.min);
                setMaxValue(range.max);
              }}
              extraSliderStyle={props.extraSliderStyle}
              extraThumbstyle={props.extraThumbstyle}
            />
            <View style={styles.tableContainer}>
              <View style={{marginBottom: 20}}>
                <Text style={styles.colorBlack}>Min Price</Text>
                <View style={styles.table}>
                  <Text style={styles.colorBlack}>${minValue}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.colorBlack}>Max Price</Text>
                <View style={styles.table}>
                  <Text style={styles.colorBlack}>${maxValue}</Text>
                </View>
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
  container: {
    // flex: 1,
    backgroundColor: '#EBECF2',
  },
  contentContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
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
