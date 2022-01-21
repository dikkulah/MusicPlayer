import MusicPlayer from '../screens/MusicPlayer';

import MusicLibrary from '../screens/MusicLibrary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';

const Tab = createBottomTabNavigator();

const BottomTabs = ({skipFromLibrary}) => {
  const [skipIndex, setskipndex] = useState(0);

  
  const onPressSongList = (song) => {
    setskipndex(song);
    

  }
  
  

  return (
    <Tab.Navigator
      initialRouteName="Müzik Çalar"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'lightslategrey',
          position: 'absolute',
          bottom: 25,
          left: 15,
          right: 15,
          elevation: 0,
          borderRadius: 15,
          height: 60,
        },
      }}
      shifting={true}>
        
      <Tab.Screen
        name="Müzik Çalar"
        children={() => <MusicPlayer songIndexFromList={skipIndex} />}
        options={{
          tabBarLabel: 'Müzik Çalar',
          tabBarActiveTintColor: 'orangered',
          tabBarInactiveTintColor: 'white',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'disc' : 'disc-outline'}
              color={focused ? 'orangered' : 'white'}
              size={40}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Kütüphane"
        children={() => <MusicLibrary onPressSongList={onPressSongList} />}
        options={{
          tabBarLabel: 'Kütüphane',
          tabBarActiveTintColor: 'orangered',
          tabBarInactiveTintColor: 'white',
          tabBarLabelStyle: {fontSize: 15},

          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'md-library' : 'md-library-outline'}
              color={focused ? 'orangered' : 'white'}
              size={40}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
