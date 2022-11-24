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
            usersFiltradoMail: [],
            textoUsuario: '',
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

    buscar(text) {
        this.setState({
            usersFiltrado: this.state.users.filter(users => users.data.userName.toLowerCase().includes(text.toLowerCase())),
            usersFiltradoMail: this.state.users.filter(users => users.data.owner.toLowerCase().includes(text.toLowerCase())),
            search: true,
            textoUsuario: text
        })
    }

    controlarCambios(event) {
        this.setState({
            textoUsuario: event.target.value
        })
    }

    borrarBuscador() {
        this.setState({
            usersFiltrado: '',
            usersFiltradoMail: '',
            textoUsuario: ''
        })
    }

    render() {
        return (           
            <View style={styles.scroll}> 
            <Text style={styles.titulo}> BUSCADOR  </Text>    
            <TextInput
                placeholder='Buscar un usuario'
                keyboardType='default'
                style={styles.text}
                onChangeText={text => this.buscar(text)}
                value={this.state.textoUsuario}
            />
            
            { this.state.usersFiltrado.length == 0 && this.state.usersFiltradoMail.length == 0 && this.state.search == true ?
                <Text style={styles.notificacion}> Ese usuario no existe </Text> 
                :
                <View style={styles.container}>
                    <FlatList
                        data={this.state.usersFiltrado}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('My profile', { email: item.data.owner })}>
                                <View style={styles.view}>  
                                    <Text  style={styles.nombre}> User name: </Text>
                                    <Text style={styles.users} >{item.data.userName}</Text>
                                </View>  
                            </TouchableOpacity>
                            
            }/>
                    <FlatList
                        data={this.state.usersFiltradoMail}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('My profile', { email: item.data.owner })}>
                                <View style={styles.view}>  
                                    <Text  style={styles.nombre}> Email: </Text>
                                    <Text style={styles.users} >{item.data.owner}</Text>
                                </View>     
                            </TouchableOpacity>
            }/>
                </View>
        }
        </View>
    )}

}
const styles = StyleSheet.create({
    container:{
        marginTop: 0
    }, 
        
    foto: {
        height: 200,
        width: 200,
        borderRadius: '50%',
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
    },
        
    view:{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center'

    }, 

    nombre:{
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize:18,
        color:'#926F5B', 
        marginLeft:'0'   
    },    
})

export default Buscar