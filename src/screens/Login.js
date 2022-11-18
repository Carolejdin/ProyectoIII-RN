import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         ActivityIndicator,
        StyleSheet } from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            errors:'',
           // loading: false
        }
    }
componentDidMount(){
    auth.onAuthStateChanged(user => {
        if(user){
            //this.setState({
            //    loading: true
            //})
            this.props.navigation.navigate('HomeMenu')
        }
       
    })
}
    loginUser(email, pass){
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                //equivalente a res.redirect
                this.props.navigation.navigate('HomeMenu')
            })
            .then(
                this.setState({
                    email:'',
                    pass:'',
                })
            )
            .catch(error => this.setState({errors:error}))
    }


    render(){
        return(
            <View> 
               
                  {/*  this.state.loading ?
                    <ActivityIndicator size='large' color='black' /> :

               <View> */}
                <Text style={styles.titulo} > LOGIN</Text>
                
                   <TextInput  
                       style={styles.text}
                       placeholder='Email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({errors: '', email:text}) }
                       value={this.state.email}
                    /> 
                    
                    <TextInput  
                        style={styles.text}
                        placeholder='Password'
                        keyboardType='default'
                        secureTextEntry= {true}
                        onChangeText={ text => this.setState({errors: '', pass:text}) }
                        value={this.state.pass}
                    />  
                 
                    { this.state.errors == '' ?
                        <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text style={styles.input} >Ingresar</Text>
                        </TouchableOpacity> :
                        
                        <Text style={styles.notificacion}>{this.state.errors.message}</Text>
                    }
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                        <Text style={styles.register} >Ir a registro</Text>
                        </TouchableOpacity>
                  
                  {/*  // </View>
                   // } */}
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
            marginBottom: 70,
        },
        text:{
            color:'#926F5B',
            border: '2px solid #926F5B',
            borderRadius:4 ,
            marginTop: '10%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize:18,
            marginLeft:'0',
            fontStyle: 'italic', 
    
            },
        
        input:{
                marginTop: '15%',
                height: 32,
                color:'white',
                backgroundColor: '#D3B9AA',
                fontFamily: 'Oswald, sans-serif',
                fontWeight:'bold',
                fontSize: 20,
                textAlign: 'center'
          
            },

        notificacion:{
            color:'#926F5B',
            marginTop: '15%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize:20,
            marginLeft:'0',

            },

        register:{
            color:'#926F5B',
             marginTop: '15%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize: 20,
            marginLeft:'0',
            fontWeight: 'bold',
        }

    })

export default Login;