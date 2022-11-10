import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"
import firebase from 'firebase'
import Post from '../components/Post'
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath'

class Comments extends Component {
  constructor (props){
    super (props)
    this.state = {
       id:this.props.route.params.id,
       data:'',
       comentario:'',

    }
}

componentDidMount(){
     //Queremos llamar a la base de datos
    db
    .collection('posts')
    .doc(this.state.id)//ya se  que voy a recibir solo uno por eso despues no hago foreach
    .onSnapshot(doc=> {this.setState({
        data: doc.data(),
        
        //arrayC: doc.data().comentario
        
     }
    )
    
    })
}

subirComentario(comentario){
    db.collection('posts')
     .doc(this.state.id)
     .update({
        comentario: firebase.firestore.FieldValue.arrayUnion({ //comentario es el nombre de la tabla del posteo donde estan los comentarios
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        comentario:comentario,
    })  
 })
 


.then(() => {
    this.setState({
       comentario: '',                       
 }) })
}

render(){
    console.log(this.state.data)
    console.log(this.state.data.comentario) 
    return (
        <View>
     { this.state.data.comentario == undefined?
       <Text> Hola </Text>:
       this.state.data.comentario.length == 0 ?
       <Text> No hay comentarios, se el primero en comentar </Text> :
      <View> 
       <Text> Comentarios del posteo</Text>
      
            <FlatList 
                    data={this.state.data.comentario}
                    keyExtractor={ oneComent => oneComent.createdAt.toString()}
                    renderItem={ ({item}) => <Text>{item.owner} comento: {item.comentario}</Text>}
     
                /> 
                
                </View> }
       

      
            <TextInput 
            placeholder='Agregar comentario'
            style={styles.input}
            keyboardType='default'
            onChangeText={text=> this.setState({comentario:text})}
            value={this.state.comentario}
            />
    
       {this.state.comentario == '' ?
       <TouchableOpacity >
       <Text> Escriba para comentar </Text>
       </TouchableOpacity> :
       <TouchableOpacity onPress={()=> this.subirComentario(this.state.comentario) }>
       <Text>Subir comentario</Text>
       </TouchableOpacity> 
       } 

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