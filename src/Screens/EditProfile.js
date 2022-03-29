import * as React from 'react';
import { Text,  Dimensions, StyleSheet, View, Alert,Pressable, ImageBackground } from 'react-native';
import CustomInput from '../components/cus';
import {useForm} from 'react-hook-form';
import gbImage from "../../assets/images/background.jpg"
import { updateAdmin } from '../graphql/mutations';
import {
  Auth, 
  API,
  graphqlOperation,
} from 'aws-amplify';

const { width, height }= Dimensions.get("screen");

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function ProfileEdit({ navigation, route }) {
  const {name, email, phone, id} = route?.params || {};
  const {control, handleSubmit, watch} = useForm();
 
  const apd = async data => {
    const {email: email, name: name, phone: phone} = data;
    try{
        const admin = {
            id: id,
            name: data.name,
            email: data.email,
            phone: data.phone
        }
        const apdm = await API.graphql({query: updateAdmin, variables: {input: admin}});
        Alert.alert("You have successfully apdated your profile")
        
    } catch (e) {
      console.log(e)
        Alert.alert(e)
    } 
    navigation.navigate("ProfileScreen")
 }
  return (
    <ImageBackground source={gbImage}  style={styles.container}>
     <View style={styles.child}>
     <View style={styles.frame}> 
     <View style={{height: 50}}></View>
    <Text style={{alignSelf: "center", color:"green", fontSize: 23}}>UPDATE</Text>
    <Text style={styles.tit}>Name</Text>
    <CustomInput
      name="name"
      control={control}
      style={styles.inpt}
      inputContainerStyle={{width: 200}}
      inputStyle ={styles.inputText}
      defaultValue={name}
      rules={{
        required: 'Name is required',
        minLength: {
          value: 3,
          message: 'Name should be at least 3 characters long',
        },
        maxLength: {
          value: 24,
          message: 'Name should be max 24 characters long',
        },
      }}
    />
      <Text style={styles.tit}>Email</Text>
    <CustomInput
    name="email"
    control={control}
    style={styles.inpt}
      inputContainerStyle={styles.Con}
      inputStyle ={[styles.inputText, {width: 200}]}
      defaultValue={email}
      rules={{
        required: 'Email is required',
        pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
      }}
     // value={email}
    />
    <Text style={styles.tit}>Phone Number</Text>
    <CustomInput
    name="phone"
    control={control}
      style={styles.inpt}
      inputContainerStyle={styles.Con}
      inputStyle ={styles.inputText}
      defaultValue={phone}
      rules={{
        required: 'Phone is required',
        minLength: {
          value: 10,
          message: 'Phone should be at least 10 characters long',
        },
      }}
    /> 
      <View style={{flexDirection:"row", alignContent: "center"}}>
    <Pressable
    onPress={handleSubmit(apd)}
    style={{padding: 10}}
    ><Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>UPDATE</Text></Pressable>
    <Pressable 
    onPress={() => navigation.goBack()}
    style={{padding: 10}}
    ><Text style={{fontSize: 20, fontWeight: "bold", color: "red"}}>CANCEL</Text></Pressable>
    </View>
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
    flex: 1,
    alignItems: "center",
    alignContent: "center",
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
    borderColor: "#013220",
    flex: 1,
    //alignItems: "center",
    alignContent: "center",
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
    })
  
  