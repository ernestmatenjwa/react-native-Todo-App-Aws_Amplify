import * as React from 'react';
import { Text, Pressable, Picker, StyleSheet, View, StatusBar } from 'react-native';
import CustomInput from "../components/cus"
import {useForm} from 'react-hook-form';

export default function AddScreen({ navigation, route }) {
  const {control, handleSubmit, watch} = useForm();
  const [selectedValue, setSelectedValue] = React.useState("java");

  //const {data} = route?.params || {};
  const addTodo = async data => {
    const {model: model, regNO: regNO, Desc: desc} = data;
    console.log(data)
    return
    try{
        const car = {
            id: carOpt.id,
            model: data.model,
            regNO: data.regNO,
            Desc: data.desc
        }
        const apdm = await API.graphql({query: updateRegisteredCars, variables: {input: car}});
        console.log("You have successfully apdated your car")
        Alert.alert("You have successfully apdated your car")
    } catch (e) {
      console.log(e)
        Alert.alert(e)
    } 
    navigation.navigate("RegisteredCars")
 }
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 18, paddingTop: "5%", color: "#013220", paddingLeft: "10%", alignSelf: "flex-start", alignItems: "flex-start"}}>Category</Text>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 10, borderLeftColor: "black" }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Personal" value="personal" />
        <Picker.Item label="School" value="school" />
        <Picker.Item label="Work" value="work" />
      </Picker>
      <Text style={{fontSize: 18, paddingTop: "5%", color: "#013220", paddingLeft: "10%", alignSelf: "flex-start", alignItems: "flex-start"}}>Title</Text>
      <CustomInput
      name="title"
      control={control}
        style={styles.inpt}
        inputContainerStyle={styles.Con}
        inputStyle ={styles.inputText}
        //defaultValue={carOpt.model}
        rules={{
          required: 'Title is required',
          minLength: {
            value: 2,
            message: 'Title must be at least 3 characters long',
          },
          maxLength: {
            value: 10,
            message: 'Title must not not exceed 20 characters long',
          }
        }}
      />
      <Text style={{fontSize: 18, paddingTop: "5%", color: "#013220", paddingLeft: "10%", alignSelf: "flex-start", alignItems: "flex-start"}}>My todo</Text>
      <CustomInput
      name="todo"
      control={control}
        multiline = {true}
        numberOfLines = {6}
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
      ><Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>SAVE</Text></Pressable>
      <Pressable 
      onPress={() => navigation.goBack()}
      style={{padding: 10}}
      ><Text style={{fontSize: 20, fontWeight: "bold", color: "red"}}>CANCEL</Text></Pressable>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: "darkorange"
  },
});