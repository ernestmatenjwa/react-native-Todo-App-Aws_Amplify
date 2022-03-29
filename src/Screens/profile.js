import * as React from 'react';
import { Text,  
  Dimensions, 
  StyleSheet, 
  View, 
  Image,
  Pressable,
  ImageBackground,
  Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import { getAdmin } from "../graphql/queries"
import { API, graphqlOperation, Auth } from "aws-amplify";
import gbImage from "../../assets/images/background.jpg"


const { width, height }= Dimensions.get("screen");

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function ProfileScreen({ navigation, route }) {
  const [name, setName] = React.useState('Full name');
  const [user, setUser] = React.useState([]);
  const [profile, setProfile] = React.useState([]);
  const [email, setEmail] = React.useState('x@gmail.com');
  const [phone, setPhone] = React.useState('xxx xxxx xxxx');
  const [id, setID] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imgeUrl, setImageUrl] = React.useState("https://image.shutterstock.com/image-vector/camera-add-icon-260nw-1054194038.jpg");

  React.useEffect(() => {
    const getProfile = async (e) => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      const ID = userInfo.attributes.sub
         try{
            const userData = await API.graphql(graphqlOperation(getAdmin, {id: ID}));
            setProfile({data: userData})
            setName(userData.data.getAdmin.name)
            setEmail(userData.data.getAdmin.email)
            setPhone(userData.data.getAdmin.phone)
            setID(userData.data.getAdmin.id)
            setImageUrl(userData.data.getAdmin.imageUrl)
            } catch (e) {
                console.log('error getting user 22', e);  
            } 
   }
       function loadUser() { 
           return Auth.currentAuthenticatedUser({bypassCache: true});
       }
       async function onLoad() {
           try {
               const user = await loadUser();
               setUser(user.attributes);
           }catch (e) {
               alert(e)
           }
       }
       onLoad();
       getProfile();
   }, [profile]);

  return (
    <ImageBackground source={gbImage} style={styles.container}>
    <View style={styles.child}>
    <View style={styles.header}>
       <Text style={styles.HeaderText}>Welcome back,  {name}!</Text>
    </View>
   
    <Image style={styles.avatar} source={{uri:imgeUrl}}/>
    <View style={styles.viewAl}>
    <Pressable 
      style={[styles.text_footer, {}]}>
      <Icon
          style={styles.iconZb}
          size={24}
          name="camera"
       />
      </Pressable> 
      <Pressable 
      // style={styles.iconZb} 
      onPress={() => navigation.navigate("ProfileEdit", {name, email, phone, id})}>        
      <Icon
        style={styles.iconZb}
        size={24}
        name="edit"
      />
      </Pressable>
    </View>

   

    <View style={styles.body}>
    <View style={styles.items}>
          <Icon  
          style={styles.icon}
            size={28}
            name="user"
          />
           <Text style={styles.name}>{name}</Text>              
          </View>
          <View style={styles.items}>
          <Icon
          style={styles.icon}
            size={24}
            name="envelope"
          />
          <Text style={styles.info}>{email}</Text>
          </View>
          <View style={styles.items} >
          <Icon
          style={styles.icon}
            size={24}
            name="phone"
          />
         <Text style={styles.description}>{phone}</Text>
        </View>
    </View>
    </View>
</ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: width,
    backgroundColor: "white",
    // padding: 1,
  },
  child: {
    width: "100%",
    flex: 1,
    //alignItems: "center",
    alignContent: "center",
    //alignSelf: "center",
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  viewAl: {
    // marginTop:50,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconZb: {
    height: 30,
    width: 30,
    margin:40,
    color:"white"
  },
  header:{
    backgroundColor: "#013220",
    height:200,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius:25,
    borderWidth: 1,
    borderColor: "white"
  },
  HeaderText:{
    color: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:50,
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130,
    
    backgroundColor:  "#013220"
  },
 
  body:{
    margin: 15,
    // backgroundColor: `transparent`,
    borderColor: "white",
    borderWidth: 2,
    borderTopWidth:0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius:25,
    padding: 15
  },
  bodyContent: {
    flex: 1,
    // alignItems: 'flex-start',
    padding:30,
  },
  items:{
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name:{
    fontSize:22,
    color:"white",
    fontWeight:'600',
    // textAlign: 'flex-start',
  },
  icon:{
    color: "white",
    marginRight: 20,
  },
  info:{
    fontSize:20,
    color: "white",
    fontWeight:'400',
  },
  description:{
    fontSize:22,
    color: "white",
    fontWeight:'500',
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#013220",
  },
  buttonText:{
    color: "#ffffff",
  }
});

const style = StyleSheet.create({
    container: {
      flex: 1, 
      width: width,
      //backgroundColor: '#009387'
      padding: 10
    },
    icon: {
        color: "#013220",
    },
    loginG:{
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: "flex-end",
        //paddingVertical: 12,
        //paddingHorizontal: 32,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: "#013220",
        //borderWidth:2,
        //borderColor: '#064451',
        width: '40%',
        height: 50,
        marginLeft: "55%",
      },
      tit: {
        fontSize: 20,
        padding: 5,
        color: "#013220",
        fontWeight: "bold"
      },
      inpt:{
        height: 30,
        borderColor: "black",
        backgroundColor: "white",
        opacity: 1,
        borderWidth: 0.5,
        borderColor: "black"
      },
      inputText: {
        fontSize: 20,
        padding: 10,
        color: "black"
      },
      Con: {
        height: 35,
        padding: 5,
      },
    UserImg: {
      width: 90,
      height: 90,
      borderRadius: 25,
      },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        height: 450,
        marginLeft:10,
        marginRight:10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        
        
       
    },
    text_header: {
        color: '#013220',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign:'center',
        paddingBottom:30
    },
    text_footer: {
        color: '#013220',
        fontSize: 18,
        paddingTop: 0,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2',
        borderLeftWidth:1,
        borderLeftColor:'#f2f2f2',
        borderRightWidth:1,
        borderRightColor:'#f2f2f2',
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: "-5%"
    },
    signIn: {
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        //marginTop: "1%"
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text:{
        color: '#05375a',
    },
    icons:{
        flexDirection:'row',
        alignItems:'flex-start'
    },
    image: {
      height:'100%',
      width:"100%",
      justifyContent:'center',
      alignItems:"center",
      borderRadius:25,
      overflow:'hidden'
      },
      text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
    
      }
  });
