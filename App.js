import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Content from './components/Content'

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let text = 'Fetching...';

  const getPosition = async () => {

    try {

      await Location.requestForegroundPermissionsAsync();

      let current_location = await Location.getCurrentPositionAsync();
      setLocation(current_location);
      console.log(current_location);

    } catch (error) {
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
  }

  return (
    <Content text={text} />
  );
}

export default App;