import "react-native-gesture-handler"
import React from 'react';
import { Text,
  View, 
  StyleSheet,
 Dimensions,
 Alert,
 FlatList,
 TouchableOpacity,
 Pressable } from 'react-native';
import moment from "moment";
import Iconicons from "react-native-vector-icons/Ionicons"

const { width, height } = Dimensions.get("screen");

const data = [
    {
      id: '1',
      title: 'Washing',
      todo: 'I want to wash clothes',
      category: 'work',
    },
    {
      id: '2',
      title: 'Washing',
      todo: 'I want to wash blankets',
      category: 'Personal',
    },
    {
      id: '3',
      title: 'code',
      todo: 'I want to wash clothes',
      category: 'work',
    },
    {
      id: '4',
      title: 'daily review',
      todo: 'I want to wash clothes',
      category: 'work',
    },
    {
      id: '5',
      title: 'Washing',
      todo: 'I want to wash clothes',
      category: 'Personal',
    },
    {
      id: '6',
      title: 'Google meet',
      todo: 'I want to wash clothes',
      category: 'work',
    },
    {
      id: '7',
      title: 'Play soccer',
      todo: 'I want to wash clothes',
      category: 'Personal',
    },
    {
      id: '8',
      title: 'Cram',
      todo: 'I want to wash clothes',
      category: 'School',
    },
    {
      id: '9',
      title: 'Coding',
      todo: 'I want to wash clothes',
      category: 'work',
    },
    {
      id: '10',
      title: 'Mjolo',
      todo: 'I want to wash clothes',
      category: 'Personal',
    },
    {
      id: '11',
      title: 'Washing',
      todo: 'I want to wash clothes',
      category: 'School',
    },
    {
      id: '12',
      title: 'Washing',
      todo: 'I want to wash clothes',
      category: 'work',
    },
  ];

export default function FilScreen({ navigation, route }) {
    const {category} = route?.params || {};

    const filData = category
    ? data.filter(x => 
        x.category.toLowerCase().includes(category.toLowerCase())
      )
      : data
  return (
<View style={styles.container} >
    <View style={{height: height/1.5, backgroundColor: "lightgrey", }}>
    <FlatList 
      //style={{height:height/1.54, }}
      data={filData}
      keyExtractor={item=>item.id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("UpdateScreen", {todo : item})}>
          <View style={styles.userInfo}>
          <View style={styles.TextSection}>
          <Pressable 
          style={{width: "100%", marginLeft: "90%"}}
          onPress={() => navigation.navigate('AddScreen')}  >   <Iconicons
          size={30} 
          color={"#013220"}
          name="trash" 
        /></Pressable>
              <Text style={[styles.UserName, {marginTop: "-10%", color: "#013220", textTransform: "capitalize",  }]}>{item.title}</Text>
              <Text style={styles.MessageText}>{item.todo}</Text>
              <View style={{borderTopWidth: 1, borderTopColor: "grey"}}>
              <Text style={{fontSize: 10}}>created: 1/4/22 /modified: 1/4/22</Text>
              </View>
          </View> 
          </View>
       </TouchableOpacity>
      )}
    />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "lightgrey"
      },
      UserName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "grey",
      },
      userInfo: {
        width: width/1.1,
        //height: 100,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 2,
        marginBottom: 5,
        //marginTop: 2,
        borderRadius: 13,
        padding: 2,  
      },
      TextSection: {
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 1,
        paddingBottom: 5,
        marginLeft: 10,
        width: 300,
        //height: "50%"
      },
      MessageText:{
        fontWeight: 'bold',
        fontSize: 12, 
        color: "grey"
      },
})