import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import Data from '../components/Data';
import SliderComponent from '../components/SliderComponent';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const {width, height} = Dimensions.get('window');

const setUpPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(Data);
  } catch (e) {
    console.log(e);
  }
};

const togglePlayback = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = props => {
  const playBackState = usePlaybackState();
  const progressSong = useProgress();
  const [songIndex, setsongIndex] = useState(0);
  const [trackTitle, settrackTitle] = useState();
  const [trackArtist, settrackArtist] = useState();
  const [trackArtwork, settrackArtwork] = useState();
  // şarkı değiştime

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    TrackPlayer.setRepeatMode(RepeatMode.Queue);

    const track = await TrackPlayer.getTrack(event.nextTrack);
    const {title, artwork, artist} = track;
    settrackTitle(title);
    settrackArtist(artist);
    settrackArtwork(artwork);
  });

  const skipToNext =  async trackId => {
    await TrackPlayer.skipToNext(trackId);
  };

  const skipFromListFunc =  async trackId => {
    try {
      await TrackPlayer.skip(trackId);
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
    
  };

  const skipToPrevious = async trackId => {
    await TrackPlayer.skipToPrevious(trackId);
    
  };

  useEffect(() => {
    setUpPlayer();
    setsongIndex(songIndex);
  }, []);

  useEffect(() => {
    skipFromListFunc(props.songIndexFromList);
  }, [props.songIndexFromList]);

  ///TASARIM
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.imageWrapperContainer}>
          <View style={styles.imageWrapper}>
            <Image
              progressiveRenderingEnabled
              style={styles.musicImage}
              source={{
                uri: trackArtwork,
              }}
            />

            <Text style={styles.songName}>{trackTitle}</Text>
            <Text style={styles.songArtist}>{trackArtist}</Text>
          </View>
        </View>

        <SliderComponent
          position={progressSong.position}
          duration={progressSong.duration}
        />
        <ButtonComponent
          isPlay={playBackState}
          toggle={() => togglePlayback(playBackState)}
          next={() =>skipToNext(songIndex)}
          previous={ () =>skipToPrevious(songIndex)}
        />
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222830',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ///resim
  imageWrapper: {
    width: 400,
    height: 400,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapperContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicImage: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  /// Şarkı bilgisi
  songName: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    marginTop: 30,
  },
  songArtist: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
});
