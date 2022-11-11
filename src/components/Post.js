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
            miLike: false, 
            comentario: this.props.postData.data.comentario.sort((a,b)=> b.createdAt - a.createdAt),
        }
    }

componentDidMount (){
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

            <TouchableOpacity style={styles.text} onPress={()=> this.props.navigation.navigate('Perfil',{email:this.props.postData.data.owner}) }>
            <Text  style={styles.text2}>Subido por {this.props.postData.data.owner} </Text>{/*  carga la vista y usa el email para buscarlo depsues. pasar props a traves de navegacion  */}
            </TouchableOpacity>

                 {
                this.state.miLike ?
                
             <TouchableOpacity style={styles.like} onPress={()=> this.disLike()} >
                <FontAwesome name='heart' color='brown' size={28} />
            </TouchableOpacity>
                :
             <TouchableOpacity style={styles.like} onPress={()=> this.like()} >
                <FontAwesome name='heart-o' color='brown' size={28} />
             </TouchableOpacity>
            } 
            <Text style={styles.textLike}> {this.state.cantidadLikes} likes</Text>
            <Text style={styles.text} > {this.props.postData.data.textoPost}</Text>
            {<Text style={styles.textComent3} > Cantidad de comentarios:{this.state.comentario.length} </Text> }
           <FlatList 
                    data={this.state.comentario.slice(0,4)} 
                    keyExtractor={ oneComent => oneComent.createdAt.toString()}
                    renderItem={ ({item}) => <Text style={styles.textComent}>{item.owner} comento: <Text style={styles.textComent2}> {item.comentario} </Text> </Text>}
                />  
           
            <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments', {id:this.props.id} //si quiero que se pueda comentar desde perfil pongo this.props.postData.id pero no se actualiza el post// quiero mandar el id del comentario en el que quiero entrar// asi podemos entrar al params del metodo route.// ahora con el id se que posteo selecciono.
                )}> 
            <Text style={styles.agregar} >Agregar comentario</Text>
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
        backgroundColor: 'white',
        alignItems:'center', 
    },

text:{
    marginTop: 0,
    fontFamily: 'Raleway, sans-serif;',
    fontSize:18,
    color:'#926F5B', 
    marginLeft:'0'   
    },

text2:{
        color:'#926F5B',
        fontSize:20,
        fontWeight: 'bold',
        marginRight:'40%',
        width:"100%",
        fontFamily: 'Oswald, sans-serif',
        borderRadius:4
    },

textComent:{
    color:'#926F5B',
    marginTop: 0,
    fontFamily: 'Raleway, sans-serif;',
    fontSize:16,
    marginLeft:'0'   
    },

textComent2:{
        color:'#926F5B',
        marginTop: 0,
        fontStyle: 'italic',
        fontFamily: 'Raleway, sans-serif;',
        fontSize:16,
        marginLeft:'0'   
        },

textComent3:{
    color:'#926F5B',
    marginTop: 0,
    fontFamily: 'Raleway, sans-serif;',
    fontSize:18,
    marginLeft:'0', 
    fontWeight: 'bold',  

 },
            

like:{
        marginRight:'25%',
        marginTop: 2,
    },

textLike:{
        color:'brown',
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize:18,
        marginLeft:'0' ,
        fontWeight: 'bold',  
        },
    
agregar:{
        color:'#946F5B',
        textDecorationLine: 'underline',
        marginTop: 0,
        marginBottom: 100,
        fontFamily: 'Raleway, sans-serif;',
        fontSize:18,
        marginLeft:'0' ,
        fontWeight: 'bold',  
        },

})
export default Post;