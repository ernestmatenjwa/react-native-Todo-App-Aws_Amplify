import * as React from 'react';
import { Text, Pressable, ImageBackground, StyleSheet, View, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CustomInput from "../components/cus"
import {useForm} from 'react-hook-form';
import { createTodo } from '../graphql/mutations';
import {
  Auth, 
  API,
  graphqlOperation,
} from 'aws-amplify';
import gbImage from "../../assets/images/background.jpg"

export default function AddScreen({ navigation, route }) {
  const {control, handleSubmit, watch} = useForm();
  const [selectedValue, setSelectedValue] = React.useState("personal");
  const [loading,setLoading] = React.useState(false);

  //const {data} = route?.params || {};
  const addTodo = async (data) => {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const { todo, title } = data;
    if(loading){
      return;
    }
    setLoading(true);
    const mycategory = selectedValue
    const mytodo = {
      desc: data.todo,
      title: data.title,
      category: mycategory,
      adminTodoId: userInfo.attributes.sub,
    }
    try{
      await API.graphql(
        graphqlOperation(
          createTodo,
          { input: mytodo }
        )
      ) 
      Alert.alert('You have succesfully created a todo');
      navigation.navigate("DashBoadScreen");
  }
  catch(e){
    Alert.alert('Error',e.message);
    console.log(e.message);
  }
    setLoading(false);
  }
  return (
    <ImageBackground source={gbImage}  style={styles.container}>
     <View style={styles.child}>
     <View style={styles.frame}> 
     <View style={{height: 50}}></View>
        <Text style={styles.label}>Category</Text>
        <View style={{borderWidth: 1, 
          borderColor: "black", 
          width: 300, 
          alignSelf: "center", 

          borderRadius: 10, 
          height: 40}}>
        <Picker
        selectedValue={selectedValue}
         itemStyle={{   fontSize:30, fontWeight: "bold" }}
        style={{  }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Personal" value="personal" />
        <Picker.Item label="School" value="school" />
        <Picker.Item label="Work" value="work" />
      </Picker>
        </View>

      <Text style={styles.label}>Title</Text>
      <CustomInput
      name="title"
      control={control}
        inputStyle={styles.inputText}
        //defaultValue={carOpt.model}
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
      name="todo"
      control={control}
        inputStyle={styles.inputText}
        rules={{
          required: 'Todo is required',
          minLength: {
            value: 3,
            message: 'Todo must be at least 3 characters long',
          },
          maxLength: {
            value: 20,
            message: 'Todo must not not exceed 20 characters long',
          }
        }}
      />
        <View style={{flexDirection:"row",}}>
      <Pressable
      onPress={handleSubmit(addTodo)}
      style={{padding: 10}}
      ><Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>{loading ? 'Loading...': "SAVE"}</Text></Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.5)'
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
});