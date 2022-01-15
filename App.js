import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Content from './components/Content';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let text = '';

  const getPosition = async () => {

    try {
      await Location.requestForegroundPermissionsAsync();
      setIsLoading(true)

      const { coords} = await Location.getCurrentPositionAsync();
      setLocation(coords);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      setErrorMsg('Permission to access location was denied');
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    const { latitude, longitude } = location;
    console.log(latitude, longitude);
  }

  console.log(text);

  return (
    
      <Content text={isLoading ? 'Loading...' : text} />
    
  );
}

export default App;