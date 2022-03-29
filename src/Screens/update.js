import * as React from 'react';
import { Text, Alert, SafeAreaView, ImageBackground, StyleSheet, View, Pressable } from 'react-native';
import CustomInput from "../components/cus"
import {useForm} from 'react-hook-form';
import { updateTodo } from '../graphql/mutations';
import {
  Auth, 
  API,
  graphqlOperation,
} from 'aws-amplify';

import gbImage from "../../assets/images/background.jpg"


export default function UpdateScreen({ navigation, route }) {
  const {control, handleSubmit, watch} = useForm();
  const {todo} = route?.params || {};

  //const {data} = route?.params || {};
  const updateTodoo = async data => {
    const {title, desc } = data;
    const idd = todo.id
    try{
        const todo = {
            id: idd,
            title: data.title,
            desc: data.desc,
        }
        const apdatelist = await API.graphql({query: updateTodo, variables: {input: todo}});
        Alert.alert("You have successfully apdated a todo")
    } catch (e) {
      console.log(e)
        Alert.alert(e)
    } 
    navigation.navigate("DashBoadScreen")
 }
  return (
    <ImageBackground source={gbImage}  style={styles.container}>
    <View style={styles.child}>
    <View style={styles.frame}> 
        <Text style={{fontSize: 18, paddingTop: "5%", color: "#013220", paddingLeft: "10%", alignSelf: "flex-start", alignItems: "flex-start"}}>Title</Text>
   <CustomInput
  name="title"
  control={control}
    style={styles.inpt}
    inputContainerStyle={styles.Con}
    inputStyle ={styles.inputText}
    defaultValue={todo.title}
    rules={{
      required: 'Title is required',
      minLength: {
        value: 2,
        message: 'Title must be at least 3 characters long',
      },
      maxLength: {
        value: 10,
        message: 'Title must not not exceed 10 characters long',
      }
    }}
  />
  <Text style={styles.label}>My todo</Text>
  <CustomInput
  name="desc"
  control={control}
  defaultValue={todo.desc}
    rules={{
      required: 'Todo is required',
      minLength: {
        value: 3,
        message: 'Todo must be at least 3 characters long',
      },
      maxLength: {
        value: 200,
        message: 'Todo must not not exceed 200 characters long',
      }
    }}
  />
    <View style={{flexDirection:"row",}}>
  <Pressable
  onPress={handleSubmit(updateTodoo)}
  style={{padding: 10}}
  ><Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>UPDATE</Text></Pressable>
  <Pressable 
  onPress={() => navigation.goBack()}
  style={{padding: 10}}
  ><Text style={{fontSize: 20, fontWeight: "bold", color: "red"}}>CANCEL</Text></Pressable>
  </View>
        <View style={styles.space} />  
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:15,
    backgroundColor:"rgb(247, 247, 247)"
  },
  child: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    //alignSelf: "center",
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  inputText: {
    color: '#064451',
    fontWeight:'normal',
   // fontFamily: '"Inter-Bold", "Inter", sans-serif',
    padding: 1,
    paddingLeft:15,
    marginRight:5,
    borderRadius:20,
  },
  inputContainer: {
    height: 40,
    borderRadius:20,
    borderColor: '#064451',
    borderWidth: 1,  
    paddingRight:10,
    backgroundColor:"rgb(247, 247, 247)",
  },
  icon:{
    color:'#064451',
    width:20,
  },
  card:{
    marginLeft:20
  },
  textBody:{
    fontSize:16,
    fontWeight:'bold',
    textAlign:'right',
    marginRight:15,  
    color: '#064451'
  
  },
  label: {
    overflow: 'visible',
    fontWeight: "300",
    // fontFamily: '"Times New Roman", Times, serif',
   // fontFamily: '"Inter-Bold", "Inter", sans-serif',
    color: '#064451',
    fontSize: 18,  
    marginLeft: 15,
    marginBottom: 4,
  },
  link:{
    color: 'blue',
    fontWeight: "300",

  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  frame: {
    marginTop: 10,
    width: "90%",
    height: "90%",
    //boxShadow: "0px 14px 9px 0px rgba(0, 0, 0, 0.05)",
    backgroundColor: "white",
    overflow: "visible",
    opacity: 0.7,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#013220"
  },
  title: {
      textAlign: 'center',
      marginTop: 15,
      overflow: 'visible',
      fontWeight: "700",
      //fontFamily: `"Inter-Bold", "Inter", sans-serif`,
      color: '#064451',
      fontSize: 20,  
      marginBottom: 10,    
  },
  space: {
    width: 20, // or whatever size you need
    height: 10,
  },
  login:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#064451',
    borderWidth:2,
    borderColor: '#064451',
    width: '94%',
    height: 50,
    marginLeft: 10,
  },
  loginG:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "rgb(11, 111, 131)",
    borderWidth:2,
    borderColor: '#064451',
    width: '94%',
    height: 50,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    fontWeight:"bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  tnc:{
    textAlign:"center",
    width:"100%"
  },
  socials:{
    textAlign:"center",
    width:"100%"
  }
});