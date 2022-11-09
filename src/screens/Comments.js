import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"
import firebase from 'firebase'
import Post from '../components/Post'



class Comments extends Component {
  constructor (props){
    super (props)
    this.state = {
       id:this.props.route.params.id,
       arrayC:[],
       data:'',
       comentario:''
    }
}
componentDidMount(){
     //Queremos llamar a la base de datos
    db
    .collection('posts')
    .doc(this.state.id)//ya se  que voy a recibir solo uno por eso despues no hago foreach
    .onSnapshot(doc=> {this.setState({
        data:doc.data(),
        //arrayC: doc.data().comentario
     })
    })
}
subirComentario(comentario){
db
.collection('posts')
.doc(this.state.id)
.update({
    comentario: firebase.firestore.FieldValue.arrayUnion({ //comentario es el nombre de la tabla del posteo donde estan los comentarios
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        comentario:comentario,
    })
    
})
.then(() => {
    this.props.navigation.navigate('Home')
    })
}

render(){
    console.log(this.props);
    return (
        <View>
        <Text> Agregar Comentario</Text>
        <FlatList
            data={this.state.arrayC}
            keyExtractor={item =>item.createdAt.toString()}
            renderItem={({item} )=> <Text> {item.comentario}</Text>}
        />
        <View>
            <TextInput 
            placeholder='Agregar comentario'
            style={styles.input}
            keyboardType='default'
            onChangeText={text=> this.setState({comentario:text})}
            value={this.state.comentario}
            />
            <TouchableOpacity onPress={()=> this.subirComentario(this.state.comentario)}>
                <Text>Subir comentario</Text>
            </TouchableOpacity>
        </View>
         </View>
    )
}
}
  const styles= StyleSheet.create({
      input:{
          height: 32,
          borderWidth:1
      }
  })

export default Comments