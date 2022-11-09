import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
    constructor (props){
        super (props)
        this.state={
            cantidadLikes:this.props.postData.data.likes.length,
            miLike: false
        }
    }
componentDidMount (){
    console.log(this.props)
    if(this.props.postData.data.likes.includes(auth.currentUser.email)){
    this.setState({
        miLike:true
    })
}
}

like(){
    db.collection ('posts')
    .doc (this.props.postData.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayUnion (auth.currentUser.email)
    })
    .then(()=> this.setState({
        cantidadLikes: this.state.cantidadLikes + 1,
        miLike: true
    })
    )
    .catch(e=>console.log(e))
}

disLike(){
    db.collection ('posts')
    .doc (this.props.postData.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayRemove (auth.currentUser.email)
    })
    .then(()=> this.setState({
        cantidadLikes: this.state.cantidadLikes - 1,
        miLike: false
    })
    )
    .catch(e=>console.log(e))
}


render(){
    console.log(this.props);
    return(
        <View style={styles.container}>
           <TouchableOpacity style={styles.text} onPress={()=> this.props.navigation.navigate('OtrosPerfiles',{email:this.props.postData.data.owner}) }>
            <Text  style={styles.text2}>Subido por: {this.props.postData.data.owner} </Text>{/*  carga la vista y usa el email para buscarlo depsues. pasar props a traves de navegacion  */}
                </TouchableOpacity>
            <Image
                style={styles.foto}
                source={{uri: this.props.postData.data.foto}}
                resizeMode='cover'
                />
                 {
                this.state.miLike ?
                
             <TouchableOpacity style={styles.like} onPress={()=> this.disLike()} >
                <FontAwesome name='heart' color='white' size={28} />
            </TouchableOpacity>
                :
             <TouchableOpacity style={styles.like} onPress={()=> this.like()} >
                <FontAwesome name='heart-o' color='white' size={28} />
             </TouchableOpacity>
            } 
            <Text style={styles.text}> {this.state.cantidadLikes} likes</Text>
            <Text style={styles.text} > {this.props.postData.data.textoPost}</Text>
           <FlatList 
                    data={this.props.postData.data.comentario}
                    keyExtractor={ oneComent => oneComent.createdAt.toString()}
                    renderItem={ ({item}) => <Text>{item.owner} comento: {item.comentario}</Text>}
                />  
           
            <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments', {id:this.props.id} // quiero mandar el id del comentario en el que quiero entrar// asi podemos entrar al params del metodo route.// ahora con el id se que posteo selecciono.
                )}>
            <Text>Agregar comentario</Text>
            </TouchableOpacity>
            
            
           
                
        </View>
    )
}
}
const styles= StyleSheet.create ({

    foto:{
        height:400,
        width:400,
        border: '2px solid #ddd',
        borderRadius:4 ,
        padding: 5,
        alignItems:'center'
          
    },
    container:{
        backgroundColor:'#926F5B',
        alignItems:'center'   
    },
    text:{
    marginTop: 0,
    fontFamily: 'Sans Serif',
    fontSize:18,
    color:'white', 
    marginLeft:'0'   
    },
    text2:{
        fontFamily: 'Sans Serif',
        color:'#926F5B',
        fontSize:20,
        backgroundColor:'white',
        marginRight:'40%',
        width:"100%",
        borderRadius:4
    },
    like:{
        marginRight:'25%',
        marginTop: 2,
    }

    

})
export default Post;