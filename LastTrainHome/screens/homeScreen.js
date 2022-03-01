import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const passData = route.params;
  const curLoc = passData.curLoc;
  const desLoc = passData.desLoc;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [curcoord, setcurcoord] = useState(null);
  const [descoord, setdescoord] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let curcoord = await Location.geocodeAsync(curLoc);
      let descoord = await Location.geocodeAsync(desLoc);
      setLocation(location);
      setcurcoord(curcoord);
      setdescoord(descoord);
    })();
  }, []);

  let loctext = 'Waiting..';
  if (errorMsg) {
    loctext = errorMsg;
  } else if (location) {
    loctext = JSON.stringify(location["coords"]["latitude"])+" "+JSON.stringify(location["coords"]["longitude"]);
  }

  let curlattext = 'Waiting..';
  let curlngtext = 'Waiting..';
  let deslattext = 'Waiting..';
  let deslngtext = 'Waiting..';
  if (curcoord !== null){
    curlattext = curcoord[0]["latitude"];
    curlngtext = curcoord[0]["longitude"];
  }

  if (descoord !== null){
    deslattext = descoord[0]["latitude"];
    deslngtext = descoord[0]["longitude"];
  }

  return (
    <View style={styles.container}>

      <View style={styles.homeContainer}>
        <ImageBackground
        source={require('../assets/images/train.jpg')}
        style={styles.homeImage}/>

        <View style={styles.titles}>
          <Text style={styles.title}>Last Train Home</Text>
          <Text style={styles.subtitle}>Catch your last train back home!</Text>
        </View>

        <View style={styles.inputSpace}>
          <Text style={styles.inputText}>Starting Location</Text>
          <Text style={styles.inputText}>{curLoc}</Text>
          <Text style={styles.inputText}>Destination</Text>

          <Text style={styles.inputText}>{desLoc}</Text>
          <Text style={styles.inputText}>{curlattext}</Text>
          <Text style={styles.inputText}>{curlngtext}</Text>
          <Text style={styles.inputText}>{deslattext}</Text>
          <Text style={styles.inputText}>{deslngtext}</Text>

        </View>

        <Button style={styles.inputButton}
         title="Search" onPress={() => {navigation.navigate('Mapview')}} />

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeContainer: {
    width: '100%',
    height: '100%',
  },

  titles: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  subtitle: {
    fontSize: 15,
    color: '#bfbfbf',
  },

  homeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  inputSpace: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 15,
    color: 'white',
  },

  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 400,
    color: 'white',
  },

  inputButton: {
    width: '100px',
    height: '30px',
  }
});