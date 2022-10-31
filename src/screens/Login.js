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
            loading: true
        }
    }
componentDidMount(){
    auth.onAuthStateChanged(user => {
        if(user){
            this.props.navigation.navigate('HomeMenu')
        } else{
            this.state.loading = false
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
            .catch(error => console.log(error))
    }


    render(){
        return(
            <View> 
               {/* {
                    this.state.loading ?
                    <ActivityIndicator size='large' color='black' /> :

               <View> */}
                <Text>Login</Text>
                {/* <View> */}
                   <TextInput  
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    />  

                    <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text>
                {/* </View>
            </View>
             } */}
        </View>
        )
    }
    
}


export default Login;