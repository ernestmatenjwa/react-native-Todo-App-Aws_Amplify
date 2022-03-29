import "react-native-gesture-handler"
import React from 'react';
import { Text,
  View, 
  StyleSheet,
 Dimensions,
 Alert,
 ImageBackground,
 FlatList,
 TouchableOpacity,
 Pressable } from 'react-native';
import moment from "moment";
import Iconicons from "react-native-vector-icons/Ionicons"
import {
  Auth, 
  API,
  graphqlOperation,
} from 'aws-amplify';
import { getAdmin } from "../graphql/queries";
import { deleteTodo } from '../graphql/mutations';
import gbImage from "../../assets/images/background.jpg"

const { width, height } = Dimensions.get("screen");

export default function FilScreen({ navigation, route }) {
    const {category} = route?.params || {};
    const [todo, setTodo] = React.useState([]);
    const [idd, setID] = React.useState('');

    React.useEffect(() => {
      const fetchTodos = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      const ID = userInfo.attributes.sub
      setID(ID);
        try {
          const userData = await API.graphql(graphqlOperation(getAdmin, {id: userInfo.attributes.sub}));
          setTodo(userData.data.getAdmin.todo.items);        
          return
        } catch (e) {
          console.log(e);
        }
      }
      fetchTodos();
    }, [todo])

    const del = async (id) => {
      try{
          const do_ = {
              id: id,
          }
          const dedm = await API.graphql({query: deleteTodo, variables: {input: do_}});
          Alert.alert("You have successfully deleted a do")
      } catch (e) {
        console.log(e)
          Alert.alert(e)
      } 
      
    }
    const filData = category
    ? todo.filter(x => 
        x.category.toLowerCase().includes(category.toLowerCase())
      )
      : todo
  return (
    <ImageBackground source={gbImage} style={styles.container} >
    <ImageBackground source={gbImage} style={{height: height/1.18, backgroundColor: "lightgrey", }}>
      <View style={styles.child}>
    <FlatList 
      data={filData}
      keyExtractor={item=>item.id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("UpdateScreen", {todo : item})}>
          <View style={styles.userInfo}>
          <View style={styles.TextSection}>
              <Text style={[styles.UserName, { color: "#013220", textTransform: "capitalize",  }]}>{item.title}</Text>
              <Text style={styles.MessageText}>{item.desc}</Text>
              <View style={{borderTopWidth: 1, borderTopColor: "grey"}}>
              <Text style={{fontSize: 10}}>CREATED: {moment(item.createdAt).format('DD/MM/YYYY, h:mma')}</Text>
              <Text style={{fontSize: 10}}>MODIFIED: {moment(item.updatedAt).format('DD/MM/YYYY, h:mma')}</Text>
              </View>
          </View> 
          </View>
          <View>
                  <Pressable 
                style={{ marginTop: "-25%", marginLeft: "91%"}}
                ><Text onPress={() => del(item.id)}  ><Iconicons
                size={30} 
                color={"#013220"}
                name="trash" 
              /></Text></Pressable>
                  </View>
       </TouchableOpacity>
      )}
      ListEmptyComponent={<View 
        style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',}}><Text 
        style={{fontWeight: 'bold', fontSize: 10, color: "green", }}>
          Sorry we currently do not have todos for you</Text>
          </View>}
    />
    </View>
    </ImageBackground>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: "lightgrey",
    // height: height,
   },
   UserName: {
     fontSize: 16,
     fontWeight: "bold",
     color: "grey",
   },
   userInfo: {
     width: width/1.1,
     //height: "40%",
     backgroundColor: "white",
     flexDirection: "row",
     borderWidth: 1,
     //justifyContent: "space-between",
     //marginHorizontal: 2,
     marginRight: "10%",
     marginTop: 5,
     borderTopRightRadius: 13,
     borderBottomRightRadius: 13, 
     //padding: 2, borderRadiusTop: 13,  
   },
   TextSection: {
     flexDirection: "column",
     justifyContent: "center",
     paddingTop: 1,
     paddingBottom: 5,
     marginLeft: 10,
     width: 300,
     height: 100
   },
   MessageText:{
     fontWeight: 'bold',
     fontSize: 12, 
     color: "grey"
   },
})