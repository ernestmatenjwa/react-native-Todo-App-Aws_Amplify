import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const CustomInput = ({
  control,
  name,
  iconName,
  rules = {},
  placeholder,
  defaultValue,
  secureTextEntry,
  multiline,
  numberOfLines,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <Input
              inputStyle ={styles.inputText}                
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              multiline = {true}
              numberOfLines = {numberOfLines}
              // style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={styles.error}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'white',
  //   width: '100%',

  //   borderColor: '#e8e8e8',
  //   borderWidth: 1,
  //   borderRadius: 5,

  //   paddingHorizontal: 10,
  //   marginVertical: 5,
  // },
  input: {
    height: 55,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:15,
    backgroundColor:"red"
  },
  inputText: {
    color: '#064451',
    fontWeight:'normal',
   // fontFamily: '"Inter-Bold", "Inter", sans-serif',
    padding: 1,
    paddingLeft:15,
    marginRight:5,
    borderRadius:10,
    borderWidth: 1,
    borderColor: "#013220",
    width: 300,
  },
  inputContainer: {
    width: 300,
    height: 40,
    borderRadius:10,
    borderColor: '#064451',
    borderWidth: 1,  
    paddingRight:10,
    backgroundColor:"rgb(247, 247, 247)",
  },
  icon:{
    color:'#064451',
    width:20,
  },
  error:{
    textAlign:'center',
    color:'red',
    marginBottom: 1,
  }
});

export default CustomInput;
