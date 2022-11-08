import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
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
            <Text style={styles.text}> Cantidad de Likes:{this.state.cantidadLikes}</Text>
            <Text style={styles.text} > {this.props.postData.data.textoPost}</Text>
            <TouchableOpacity style={styles.text} onPress={()=> this.props.navigation.navigate('OtrosPerfiles',{email:this.props.postData.data.owner}) }>
            <Text  style={styles.text2}>Subido por: {this.props.postData.data.owner}</Text>{/*  carga la vista y usa el email para buscarlo depsues. pasar props a traves de navegacion  */}
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
    fontFamily: 'Sans Serif',
    fontSize:18,
    color:'white',    
    },
    text2:{
        fontFamily: 'Sans Serif',
        color:'white',
        fontSize:18,
        marginBottom: 15,
    },
    like:{
        marginRight:'25%'
    }

    

})
export default Post;