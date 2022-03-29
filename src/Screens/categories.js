import "react-native-gesture-handler"
import React from 'react';
import { Text,
  View, 
  StyleSheet,
  ImageBackground,
 Alert,
 FlatList,
 TouchableOpacity,
 Dimensions } from 'react-native';
import moment from "moment";
import { getAdmin } from "../graphql/queries";
import {
  Auth, 
  API,
  graphqlOperation,
} from 'aws-amplify';
import gbImage from "../../assets/images/background.jpg"

const { width, height } = Dimensions.get("screen");

export default function CategoriesScreen({ navigation }) {
  const [workC,setWork] = React.useState([0]);
  const [schoolC,setSchool] = React.useState(0);
  const [personalC,setPersonal] = React.useState(0);
  const [todo, setTodo] = React.useState([]);
  let work = 0
  let school = 0
  let personal = 0
  React.useEffect(() => {
    const fetchTodos = async () => {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    try {
      const userData = await API.graphql(graphqlOperation(getAdmin, {id: userInfo.attributes.sub}));
      setTodo(userData.data.getAdmin.todo.items); 
     //console.log(userData.data.getAdmin.todo.items[1].category)
      for (let i = 0; i < userData.data.getAdmin.todo.items.length; i++) {
        //console.log("if")
        if(userData.data.getAdmin.todo.items[i].category === "school"){
          school = school + 1
        }
        if(userData.data.getAdmin.todo.items[i].category === "personal"){
          personal = personal + 1
        }
        if(userData.data.getAdmin.todo.items[i].category === "work"){
          work = work + 1
        }
      }
      setPersonal(personal)
      setSchool(school)
      setWork(work)
    } catch (e) {
      console.log(e);
    }
  }
  fetchTodos();

  }, [todo])

  return (
  <ImageBackground source={gbImage} style={styles.container}>
    <View style={styles.child}>
    <TouchableOpacity onPress={() => navigation.navigate("FilScreen", {category : "Work"})} style={{paddingLeft: 5, borderTopWidth: 1, height: 60, borderTopColor: "black", backgroundColor:"white", opacity: 0.5, alignContent: "center",}}>
        <Text style={{fontSize: 20, color:"#013220", fontWeight: 'bold', paddingTop: "5%"}}>Work ({workC})</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("FilScreen", {category : "School"})} style={{paddingLeft: 5,opacity: 0.5, borderTopWidth: 1, height: 60, borderTopColor: "black", backgroundColor:"white", alignContent: "center", }}>
        <Text style={{fontSize: 20, color:"#013220", fontWeight: 'bold', paddingTop: "5%"}}>School ({schoolC})</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("FilScreen", {category : "Personal"})} style={{paddingLeft: 5,opacity: 0.5, borderTopWidth: 1, height: 60, borderTopColor: "black", backgroundColor:"white", alignContent: "center", }}>
        <Text style={{fontSize: 20, color:"#013220", fontWeight: 'bold', paddingTop: "5%"}}>Personal ({personalC})</Text>
    </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "lightgrey"
  },
  child: {
    width: "100%",
    flex: 1,
    //alignItems: "center",
    alignContent: "center",
    //alignSelf: "center",
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
})