import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Data from '../components/Data';
import MusicPlayer from './MusicPlayer';
const MusicLibrary = (props) => {
  
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => {props.onPressSongList(item.id)} }>
      <View style={styles.buttonContainer}>
        <Text style={styles.songTitleStyle}>
          {item.title} - {item.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#222830', flex: 1}}>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default MusicLibrary;
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 15,
  },
  songTitleStyle: {
    fontSize: 30,
    color: 'white',
    margin: 10,
  },
});
