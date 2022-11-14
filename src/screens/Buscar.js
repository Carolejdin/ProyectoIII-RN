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
            textoUsuario:''
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
            usersFiltrado: this.state.users.filter(info => info.data.userName.toLowerCase().includes(this.state.textoUsuario.toLowerCase()))
        
        })
    }

    controlarCambios(event){
        this.setState({
            textoUsuario: event.target.value
        })
    }

    render() {
        console.log(this.state.users)
        console.log(this.state.usersFiltrado)
        return (
            <View>
            <TextInput  
                       placeholder='buscador'
                       keyboardType='default'
                       onChangeText={ text => this.setState({textoUsuario:text}) }
                       value={this.state.textoUsuario}
                       onChange={(event)=>this.controlarCambios(event)}
                    /> 
                    <TouchableOpacity onPress={(event)=> this.evitarSubmit(event)}>
                        <Text>Buscar</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.usersFiltrado}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item})=> <Text>{item.data.userName}</Text>}
                    />
                    </View>
                
        )
    }

}

export default Buscar