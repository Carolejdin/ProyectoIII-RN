import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
        StyleSheet,
        ActivityIndicator } from 'react-native';
import MyCamera from '../components/MyCamera';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            userName:'',
            bio:'',
            errors:'',
            foto:'',
            showCamera:false,
        }
    }


    registerUser(email, pass, userName, bio, foto){
        //Registrar en firebase y si el reigstro sale bien redireccionar a login
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                
                db.collection('users').add({
                    owner: email,
                    userName: userName,
                    bio: bio,
                    foto: foto,
                    createdAt: Date.now()
                })
                .then(() => {
                    this.setState({
                        email:'',
                        pass:'',
                        userName:'',
                        bio:'',
                        errors:'',
                        showCamera: false,                        
                    })
                   
                    this.props.navigation.navigate('Login')
                })
                .catch(error => console.log(error))    
                
            })
           // .catch(error => console.log(error))    
            .catch(error => this.setState({errors:error}))
    }

    onImageUpload(url){
        this.setState({
            foto: url,
            showCamera: false,
        })
        
    }

    render(){
        return(
            <View> 
                <Text style={styles.titulo}> REGISTRO </Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                        <Text style={styles.login} >Ir a Login</Text>
                </TouchableOpacity>
                <View>
                    <TextInput  
                        style={styles.text}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({errors:'',email:text}) }
                        value={this.state.email}
                    /> 
                    <TextInput  
                        style={styles.text}
                        placeholder='Password'
                        keyboardType='default'
                        secureTextEntry= {true}
                        onChangeText={ text => this.setState({errors:'',pass:text}) }
                        value={this.state.pass}
                    /> 
                    <TextInput  
                        style={styles.text}
                        placeholder='User name'
                        keyboardType='default'
                        onChangeText={ text => this.setState({errors:'', userName:text}) }
                        value={this.state.userName}
                    />
                    <TextInput  
                        style={styles.text}
                        placeholder='Mini Bio'
                        keyboardType='default'
                        onChangeText={ text => this.setState({errors:'',bio:text}) }
                        value={this.state.bio}
                    />  

                      {  this.state.showCamera ?
                        <View style={{width: '100vw', heigth: '100vh'}}>
                            <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamera:true})}>
                            <Text style={styles.text} > Subir foto de perfil</Text>
                        </TouchableOpacity>
                    }

                     {
                    this.state.email == '' || this.state.pass == '' || this.state.userName == ''  || this.state.foto == '' ?
                    <Text  style={styles.notificacion}> Completar los campos</Text> 
                    :
                
                     <TouchableOpacity onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName, this.state.bio, this.state.foto)}>
                        <Text style={styles.input} > REGISTRARME </Text>
                    </TouchableOpacity>     
                  
                    }

                    
               
                 <Text>{this.state.errors.message}</Text>
                
                
                </View>
                
            </View>
        )
    }
    
}

const styles= StyleSheet.create ({

        titulo:{
            fontFamily: 'Oswald, sans-serif',
            color:'white',
            fontWeight: 'bold',
            fontSize: 35,
            textAlign:'center',
            backgroundColor:'#926F5B',
            marginBottom: 10,
        },
        text:{
            color:'#926F5B',
            border: '2px solid #926F5B',
            borderRadius:4 ,
            marginBottom: '5%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize:18,
            fontStyle: 'italic', 
            position: 'relative'
    
            },
        
        input:{
                marginTop: '15%',
                height: 32,
                color:'white',
                backgroundColor: '#D3B9AA',
                fontFamily: 'Oswald, sans-serif',
                fontWeight:'bold',
                fontSize: 20,
                textAlign: 'center',
              
          
            },

        notificacion:{
            color:'#926F5B',
            marginTop: '15%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize:20,
            marginLeft:'0',

            },

        login:{
            color:'#926F5B',
            marginBottom: '8%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize: 20,
            marginLeft:'0',
            fontWeight: 'bold',
            
        },

    })


export default Register;