import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Content from './components/Content'

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getPosition = async () => {

      let response = await Location.requestForegroundPermissionsAsync();
console.log(response);
 
      if(!response.granted){ 
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let current_location = await Location.getCurrentPositionAsync();
      setLocation(current_location);
    console.log(current_location);
  };

  useEffect(() => {
    getPosition(); 
  }, []);

  let text = 'Fetching...'; 
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