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
                <Text style={styles.titulo}> BUSCADOR  </Text>
            <TextInput  
                       placeholder='Buscar un usuario'
                       keyboardType='default'
                       style={styles.text}
                       onChangeText={ text => this.setState({textoUsuario:text}) }
                       value={this.state.textoUsuario}
                       onChange={(event)=>this.controlarCambios(event)}
                    /> 

                    {
                        this.state.textoUsuario =='' ?
                      <Text style={styles.notificacion}>Completar el campo</Text>:
                        <View>
                  <TouchableOpacity onPress={(event)=> this.evitarSubmit(event)}>
                       <Text style={styles.input} > Buscar</Text>
                  </TouchableOpacity>
                       </View>
    }
                       {this.state.usersFiltrado.length == 0 && this.state.search == true ?
                        <Text style={styles.notificacion} > Ese usuario no existe </Text> :
                        <View>
                        <FlatList
                        data={this.state.usersFiltrado}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item})=> 
                            <Text style={styles.users} onPress={()=> this.props.navigation.navigate('Profile',{email : item.data.email})}>{item.data.userName} </Text> 
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
            marginTop: 0,
            marginBottom: '10%',
            fontFamily: 'Raleway, sans-serif;',
            fontSize: 25,
            marginLeft:'0',
            fontStyle: 'italic', 
            border: '2px solid #926F5B',
            borderRadius: 4 , 

            },
        
        input:{
                height: 32,
                color:'white',
                backgroundColor: '#D3B9AA',
                fontFamily: 'Oswald, sans-serif',
                fontWeight:'bold',
                fontSize: 25,
                textAlign: 'center',
                marginBottom: '10%',
          
            },

        notificacion:{
            color:'#926F5B',
            marginTop: 0,
            fontFamily: 'Raleway, sans-serif;',
            fontSize: 20,
            marginLeft:'0',
            fontWeight: 'bold'
            },

        users:{
            color:'#926F5B',
            marginTop: 0,
            fontFamily: 'Raleway, sans-serif;',
            fontSize: 24,
            marginLeft:'0',
            fontWeight: 'bold',
            flexDirecion: 'wrap',
            textAlign: 'center',
            textDecorationLine: 'underline',
        }

    })

export default Buscar