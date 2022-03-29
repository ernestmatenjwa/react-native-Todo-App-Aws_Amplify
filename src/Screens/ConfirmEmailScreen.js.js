import React, {useState}from 'react';
import {Alert, SafeAreaView, TextInput, Text, Pressable, ImageBackground, StyleSheet, View } from 'react-native';
import gbImage from "../../assets/images/background.jpg"
import CustomInput from '../components/CustomInput/CustomInput';
import {useForm} from 'react-hook-form';
import {useRoute } from '@react-navigation/native';
import {Auth} from 'aws-amplify';

export default function ConfirmEmailScreen({ navigation }) {
  const [loading,setLoading] =useState(false);
  const route = useRoute();
  const {control, handleSubmit,watch} = useForm({defaultValues: {username: route?.params?.username}});
  const username = watch('username'); 
  const onConfirmPressed = async data => {
    if(loading){
      return;
    }
    setLoading(true);
    try{
     await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('LoginScreen');  
    }
    catch(e){
      Alert.alert('Error',e.message);
    }
    setLoading(false);
  };

  const onSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  const onResendPress = async () => {

    try{
      const response =await Auth.resendSignUp(username);
      
      Alert.alert('Success',response);
    navigation.navigate('LoginScreen');
    }
    catch(e){
     
      Alert.alert('Error',e.message);
    }
  };

  return (
    <ImageBackground source={gbImage}  style={styles.container}>
       <View style={styles.child}>
      <View style={styles.frame}>
          <Text style={styles.title}>Confirm Email</Text>
          <SafeAreaView>
            <Text style={styles.label}>Username</Text> 
          
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username code is required',
          }}
          iconName='user'
        />
           <Text style={styles.label}>Code</Text> 
         
        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
          iconName='lock'
        />
          </SafeAreaView>
          <Pressable 
               style={styles.loginG} 
               onPress={handleSubmit(onConfirmPressed)}>
             <Text style={styles.text}>{loading ? 'Loading...': "Confirm" }</Text>
            </Pressable>

            <Pressable 
               style={styles.login} 
               onPress={onResendPress}>
             <Text style={styles.text}>Resend code</Text>
            </Pressable>
        
            <View style={styles.space} />
      </View>
      </View>
    </ImageBackground>
  );
};

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
    color: '#013220',
    fontWeight:'normal',
    padding: 13,
    paddingLeft:15,
    marginRight:5,
    borderRadius:20,
  },
  inputContainer: {
    height: 50,
    borderRadius:20,
    borderColor: '#013220',
    borderWidth: 1,  
    paddingRight:10,
    backgroundColor:"rgb(247, 247, 247)",
  },
  icon:{
    color:'#013220',
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
    color: '#013220'
  
  },
  label: {
    overflow: 'visible',
    fontWeight: "300",
    //fontFamily: `"Inter-Bold", "Inter", sans-serif`,
    color: '#013220',
    fontSize: 18,  
    marginLeft: 15,
    marginBottom: 10,
  },
  link:{
    color: 'blue'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    // backgroundColor:'#064451',
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
  },
  frame: {
    width: "90%",
    // boxShadow: "0px 14px 9px 0px rgba(0, 0, 0, 0.05)",
    backgroundColor: "rgb(247, 247, 247)",
    overflow: "visible",
    borderRadius: 15,
    opacity: 0.4,
  },
   title: {
      textAlign: 'center',
      marginTop: 25,
      overflow: 'visible',
      fontWeight: "700",
      color: '#013220',
      fontSize: 20,  
      marginBottom: 30,    
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  login:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#013220',
    borderWidth:2,
    borderColor: '#013220',
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
    borderColor: '#013220',
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
    display: 'flex',
    flexWrap: 'nowrap'
  }
});