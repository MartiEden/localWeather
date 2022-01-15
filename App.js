import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Content from './components/Content';
import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from './utils/constants';
import axios from 'axios'
import Weather from './components/Weather';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [location, setLocation] = useState(null)

  const getWeatherInfo = async (latitude, longitude) => {

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    setLocation(data)
  }

  const getPosition = async () => {

    try {
      await Location.requestForegroundPermissionsAsync();
      setIsLoading(true);

      const { coords } = await Location.getCurrentPositionAsync();

      getWeatherInfo(coords.latitude, coords.longitude);

      setIsLoading(false)

    } catch (error) {
      console.log(error);
      setErrorMsg('Permission to access location was denied')
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  return (

    (isLoading || errorMsg) ?
      (<Content text={isLoading ? 'Loading...' : errorMsg} />)
      :
      (<Weather data={location} />)

  );
}

export default App;