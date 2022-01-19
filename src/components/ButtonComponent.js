import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {State} from 'react-native-track-player';

export default function SliderComponent({isPlay,toggle,next,previous}) {
   return (
    <View style={styles.buttonContainer}>
       <TouchableOpacity style={styles.buttonStyle} onPress={previous}>
        <Ionicons name="chevron-back" size={50} color="#888888" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={toggle}>
        <Ionicons
          name={isPlay === State.Playing ? 'pause' : 'caret-forward'}
          size={75}
          color="orangered"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={next}>
        <Ionicons name="chevron-forward" size={50} color="#888888" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonStyle: {
    marginHorizontal: 15,
  },
});
