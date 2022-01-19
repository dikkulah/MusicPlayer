import Slider from '@react-native-community/slider';
import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import TrackPlayer from 'react-native-track-player';

export default function SliderComponent({position, duration}) {
 
  function millisToMinutesAndSeconds(millis) {
    var fixedTime = new Date(millis * 1000).toLocaleTimeString().substring(3);
    return fixedTime;
  }

  return (
    <View>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="white"
        maximumTrackTintColor="grey"
        thumbTintColor="#888888"
        onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
      />
      <View style={styles.songProgress}>
        <Text style={styles.songLabel1}>
          {millisToMinutesAndSeconds(position)}
        </Text>
        <Text style={styles.songLabel2}>
          {millisToMinutesAndSeconds(duration)}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  progressBar: {
    width: 350,
    height: 50,

    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 75,
  },

  songProgress: {
    width: 310,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 18,
  },
  songLabel1: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 18,
  },
  songLabel2: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 250,
  },
});
