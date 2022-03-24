import "react-native-gesture-handler"
import React from 'react';
import { Text,
  View, 
  StyleSheet,
 Dimensions,
 Alert,
 FlatList,
 TouchableOpacity,
Image } from 'react-native';
import moment from "moment";


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
export default function CategoriesScreen({ navigation }) {
  const [workC,setWork] = React.useState([0]);
  const [schoolC,setSchool] = React.useState(0);
  const [personalC,setPersonal] = React.useState(0);
  let work = 0
  let school = 0
  let personal = 0

  React.useEffect(() => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].category === "School"){
          school = school + 1,
          console.log("school", school)
        }
        if(data[i].category === "Personal"){
          personal = personal + 1,
          console.log("personal", personal)
        }
        if(data[i].category === "work"){
          work = work + 1,
          console.log("work", work)
        }
      }
      setPersonal(personal)
      setSchool(school)
      setWork(work)
  }, [])

  return (
  <View style={{backgroundColor: "lightgrey"}} >
    <TouchableOpacity onPress={() => navigation.navigate("FilScreen", {category : "Work"})} style={{paddingLeft: 5, borderTopWidth: 1, height: "50%", borderTopColor: "grey", backgroundColor:"white", alignContent: "center",}}>
        <Text style={{fontSize: 18, color:"grey", paddingTop: "5%"}}>Work ({workC})</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("FilScreen", {category : "School"})} style={{paddingLeft: 5, borderTopWidth: 1, height: "50%", borderTopColor: "grey", backgroundColor:"white", alignContent: "center", }}>
        <Text style={{fontSize: 18, color:"grey", paddingTop: "5%"}}>School ({schoolC})</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("FilScreen", {category : "Personal"})} style={{paddingLeft: 5, borderTopWidth: 1, height: "50%", borderTopColor: "grey", backgroundColor:"white", alignContent: "center", }}>
        <Text style={{fontSize: 18, color:"grey", paddingTop: "5%"}}>Personal ({personalC})</Text>
    </TouchableOpacity>
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
})