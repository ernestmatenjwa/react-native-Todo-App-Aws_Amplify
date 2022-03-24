import * as React from 'react';
import { Text, Pressable, ImageBackground, StyleSheet, View, StatusBar } from 'react-native';

export default function ProfileScreen({ navigation, route }) {
  //const {data} = route?.params || {};
  return (
    <View style={styles.container}>
     <Text style={styles.titlee}>Todo app</Text>
     <View style={styles.space} />
     <Pressable 
      style={styles.login} 
      onPress={() =>  navigation.push("DashBoadScreen")}
     ><Text style={styles.text}>Sign Up</Text></Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: "darkorange"
  },
});