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
        console.log(this.state.users)
        console.log(this.state.usersFiltrado)
        return (
            <View>
                <TextInput
                    placeholder='Buscar un usuario'
                    keyboardType='default'
                    onChangeText={text => this.buscar(text)}
                    value={this.state.textoUsuario}
                />
                {this.state.usersFiltrado.length == 0 && this.state.usersFiltradoMail.length == 0 && this.state.search == true ?
                    <Text> Ese usuario no existe </Text> 
                    :
                    <View>
                        <FlatList
                            data={this.state.usersFiltrado}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                            <>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { email: item.data.owner })}>
                                    <Text>{item.data.userName}</Text>
                                </TouchableOpacity>
                            </>
                            }
                        />
                         <FlatList
                            data={this.state.usersFiltradoMail}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                            <>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { email: item.data.owner })}>
                                    <Text>{item.data.owner}</Text>
                                </TouchableOpacity>
                            </>
                            }
                        />
                    </View>
                }
            </View>

        )
    }

}
const styles = StyleSheet.create({

    foto: {
        height: 200,
        width: 200,
        borderRadius: '50%',
        padding: 5,
    },

})

export default Buscar