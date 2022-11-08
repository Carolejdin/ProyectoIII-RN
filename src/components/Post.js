import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'


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
            <Text style={styles.text} > {this.props.postData.data.textoPost}</Text>
            <TouchableOpacity style={styles.text} onPress={()=> this.props.navigation.navigate('OtrosPerfiles',{email:this.props.postData.data.owner}) }>
            <Text  style={styles.text}> Subido por: {this.props.postData.data.owner}</Text>{/*  carga la vista y usa el email para buscarlo depsues. pasar props a traves de navegacion  */}
                </TouchableOpacity>
            
            <Text style={styles.text}> Cantidad de Likes:{this.state.cantidadLikes}</Text>
            {
                this.state.miLike ?
                <TouchableOpacity onPress={()=> this.disLike()}>
                    <Text> No me gusta</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <Text> Me gusta</Text>
                </TouchableOpacity>

            }
                
        </View>
    )
}
}
const styles= StyleSheet.create ({

    foto:{
        height:400,
        width:400
    },
    container:{
        alignItems:'center',
        backgroundColor:'#926F5B'
    },
    text:{
    fontFamily: 'Sans Serif',
    color:'white'
    
    },

    

})
export default Post;