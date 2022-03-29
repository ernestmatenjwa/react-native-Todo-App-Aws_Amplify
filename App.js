import "react-native-gesture-handler"
import React from "react"
import { View, Text } from 'react-native';
import HomeScreen from "./src/Screens/HomeScreen";
import ProfileScreen from "./src/Screens/profile";
import FilScreen from "./src/Screens/fil";
import SignupScreen from "./src/Screens/Signup";
import LoginScreen from "./src/Screens/Login";
// import DashBoadScreen from "./src/Screens/dashBoard";
// import BusinessProfileScreen from "./src/Screens/BusinessProfile";
// import AdminProfileScreen from "./src/Screens/adminProfile"
import ProfileEdit from "./src/Screens/EditProfile";
import ConfirmEmailScreen from "./src/Screens/ConfirmEmailScreen.js"
import ForgotPasswordScreen from "./src/Screens/ForgotPasswordScreen"
import NewPasswordScreen from "./src/Screens/NewPasswordScreen"
import AllScreen from "./src/Screens/all";
import CategoriesScreen from "./src/Screens/categories";
import AddScreen from "./src/Screens/add";
import UpdateScreen from "./src/Screens/update";

import Amplify from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

//import Iconicons from "react-native-vector-icons/Ionicons"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createNativeStackNavigator();
const locationStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

const TabScreen = () => {
  return(
    <MaterialTopTabs.Navigator  
    screenOptions={{
      tabBarLabelStyle: {
         fontSize: 12, 
         fontWeight: "bold",
         textTransform: "none",
         color: "white"
        }, 
      tabBarStyle: { 
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: "#013220",
        borderTopWidth: 0,
        borderTopWidth: 0
        // borderBottomLeftRadius: 40,
       },
       tabBarIndicatorStyle:{
        backgroundColor: "white",
        //  width: 100,
        //  marginHorizontal: 40,
       },
    }}
    >
        <ProfileStack.Screen name="All" 
        component={AllScreen} />
        <ProfileStack.Screen name="Categories" component={CategoriesScreen}  />
    </MaterialTopTabs.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
       <Stack.Screen 
        name="Splash" 
        component={HomeScreen} 
        options={{
          header: () => null
          }} 
          />
       <Stack.Screen 
        name="DashBoadScreen" 
        component={TabScreen} 
        options={{
          title: 'LexytodoApp',
          headerBackVisible:false,
          headerLeft: null,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            //alignSelf: "left",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            //paddingTop: 100,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,

            // height: 100,
            backgroundColor: '#013220',
            // shadowColor: '#013220',
            //elevation: 0,
            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
          },
        }}/>
                <Stack.Screen 
        name="FilScreen" 
        component={FilScreen} 
        options={({route}) => ({
          title: route.params.category,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "white",
            fontWeight: "600"
          },
          headerStyle: {
            backgroundColor: '#013220',
            shadowColor: '#013220',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        })}
          />
        <Stack.Screen 
        name="AddScreen" 
        component={AddScreen} 
        options={{
          title: 'Add',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "white",
            fontWeight: "600"
          },
          headerStyle: {
            backgroundColor: '#013220',
            shadowColor: '#013220',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
          />
                  <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "white",
            fontWeight: "600"
          },
          headerStyle: {
            backgroundColor: '#013220',
            shadowColor: '#013220',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
          />
                  <Stack.Screen 
        name="UpdateScreen" 
        component={UpdateScreen} 
        options={{
          title: 'Edit',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "white",
            fontWeight: "600"
          },
          headerStyle: {
            backgroundColor: '#013220',
            shadowColor: '#013220',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
          />
                            <Stack.Screen 
        name="ProfileEdit" 
        component={ProfileEdit} 
        options={{
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "white",
            fontWeight: "600"
          },
          headerStyle: {
            backgroundColor: '#013220',
            shadowColor: '#013220',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
          />
              
        <Stack.Screen 
        name="SignupScreen" 
        component={SignupScreen} 
        options={{
          header: () => null
          }} 
          />

        <Stack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen} 
        options={{
          header: () => null
          }} 
          />
        <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{header: () => null}} />
        {/* <Stack.Screen 
        name="AdminEdit" 
        component={AdminEdit} 
        options={{
          header: () => null
          }} 
          /> */}
        <Stack.Screen 
        name="ConfirmEmailScreen" 
        component={ConfirmEmailScreen} 
        options={{
          header: () => null
          }} />
        <Stack.Screen 
        name="NewPasswordScreen" 
        component={NewPasswordScreen} 
        options={{header: () => null}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}