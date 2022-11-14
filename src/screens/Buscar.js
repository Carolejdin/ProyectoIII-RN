import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from "../firebase/config"
import firebase from 'firebase'


class Buscar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            usersFiltrado: [],
            textoUsuario:'',
            search: false
        }
    }
    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: user
                    })
                })
            }
        )
    }
    
    evitarSubmit(event){
        event.preventDefault()
         
        this.setState({
            usersFiltrado: this.state.users.filter(users => users.data.userName.toLowerCase().includes(this.state.textoUsuario.toLowerCase())),
            search: true,
        })
    }

    controlarCambios(event){
        this.setState({
            textoUsuario: event.target.value
        })
    }

    borrarBuscador(){
        this.setState({
            usersFiltrado: '',
            textoUsuario: ''
        })
    }

    render() {
        console.log(this.state.users)
        console.log(this.state.usersFiltrado)
        return (
            <View>
            <TextInput  
                       placeholder='Buscar un usuario'
                       keyboardType='default'
                       onChangeText={ text => this.setState({textoUsuario:text}) }
                       value={this.state.textoUsuario}
                       onChange={(event)=>this.controlarCambios(event)}
                    /> 

                    {
                        this.state.textoUsuario =='' ?
                        <Text>Completar el campo</Text>:
                        <View>
                        <TouchableOpacity onPress={(event)=> this.evitarSubmit(event)}>
                        <Text>Buscar</Text>
                       </TouchableOpacity>
                       </View>
    }
                       {this.state.usersFiltrado.length == 0 && this.state.search == true ?
                        <Text> Ese usuario no existe </Text> :
                        <View>
                        <FlatList
                        data={this.state.usersFiltrado}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item})=> 
                            <Text onPress={()=> this.props.navigation.navigate('Profile',{email : item.data.email})}>{item.data.userName} </Text> 
                            /* { <Image
                            style={styles.foto}
                            source={item.data.foto}
                            resizeMode='cover'
                            /> }
                            </View> */
                          }
                        />
                    
         
                         
                        </View>
                      
                    }
                  
                    
                    </View>
                
        )
    }

}
const styles= StyleSheet.create ({

    foto:{
        height:200,
        width:200,
        borderRadius:'50%',
        padding: 5,  
        },

    })

export default Buscar