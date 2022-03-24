import * as React from 'react';
import { Text, Pressable, ImageBackground, StyleSheet, View, StatusBar } from 'react-native';
import gbImage from "../../assets/images/background.jpg"
export default function HomeScreen({ navigation, route }) {
  //const {data} = route?.params || {};
  return (
    <ImageBackground source={gbImage} style={styles.container}>
     <Text style={styles.titlee}>my todo app</Text>
     <View style={styles.space} />
     <Pressable 
      style={styles.getstarted} 
      onPress={() =>  navigation.push("DashBoadScreen")}
     ><Text style={styles.text}>GET STARTED</Text></Pressable>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlee: {
      position: 'absolute',
      fontSize: 60,
      display: 'flex',
      alignItems: 'center',
      textTransform: 'uppercase',
      color: '#013220',
      //fontWeight: 'bold',
      textAlign: 'center',
      bottom: "50%",
  },
  getstarted: {
    position: 'absolute',
    bottom: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#013220',
    borderWidth:2,
    borderColor: 'white',
    width: '70%',
    height: '7.4%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});