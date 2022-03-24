import "react-native-gesture-handler"
import React from 'react';
import { Text,
  View, 
  StyleSheet,
 Dimensions,
 Alert,
 FlatList,
 TouchableOpacity,
 TextInput, 
 Pressable} from 'react-native';
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
export default function AllScreen({ navigation }) {
  const [searchValue, setSearchValue] = React.useState('');

  const filData = searchValue
  ? data.filter(x => 
    x.todo.toLowerCase().includes(searchValue.toLowerCase()) || x.title.toLowerCase().includes(searchValue.toLowerCase()) || x.category.toLowerCase().includes(searchValue.toLowerCase())
    )
    : data

  return (
  <View style={styles.container} >
    <TextInput
   style={{
     fontSize: 18,
     height: 40,
     width: width/1.1,
     alignSelf: "center",
     //marginTop: "-100%",
     borderWidth: 1,
     paddingLeft: 20,
     borderRadius:15,
     backgroundColor:"rgb(247, 247, 247)"}}
     placeholder="Search..."
     placeholderTextColor="#013220"
     selectionColor="#013220"
     onChange={(event) => {
     setSearchValue(event.target.value)
     }}
    />
    <View style={{height: 10}}></View>
    <View style={{height: height/1.5, backgroundColor: "lightgrey", }}>
    <FlatList 
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

  <View style={{
     flexDirection: "row", 
     alignSelf: "center",
     //width: "100%",
  }}>
    <Iconicons
    size={50} 
    color={"#013220"}
    name="add-circle" 
    onPress={() => navigation.navigate('AddScreen')}  
   />
       <Iconicons
    size={50} 
    color={"#013220"}
    name="person-circle" 
    onPress={() => navigation.navigate('ProfileScreen')}  
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