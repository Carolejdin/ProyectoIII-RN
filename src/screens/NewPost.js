import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import {db, auth} from '../firebase/config'
import MyCamera from '../components/MyCamera'

class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            owner:'',
            textoPost:'',
            createdAt:'',
            foto:'',
            showCamera:true,
        }
    }

    newPost(owner, textoPost, foto){
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
                db.collection('posts').add({
                    owner: auth.currentUser.email,
                    textoPost: textoPost,
                    foto: foto,
                    likes: [],
                    comentario:[],
                    createdAt: Date.now()
                })
                .then(() => {
                    this.setState({
                    textoPost: '',
                    showCamera: true,
                    })
                this.props.navigation.navigate('Home')
                })
                //equivalente a res.redirect
                .catch(error => console.log(error))       
    }
    onImageUpload(url){
        this.setState({
            foto:url,
            showCamera: false,
        })
    }
    render(){
        return(
            <View>
                {this.state.showCamera ?
                < MyCamera onImageUpload= {url=> this.onImageUpload(url)} />
                :
           <View> 
                <Text style={styles.titulo}> SUBIR POSTEO </Text>
                

                    <TextInput  
                        placeholder='Texto posteo'
                        keyboardType='default'
                        style={styles.text}
                        //poner propiedad para que sea text area
                        onChangeText={ text => this.setState({textoPost:text}) }
                        value={this.state.textoPost}
                    /> 
                   
                    <TouchableOpacity onPress={()=>this.newPost(this.state.owner, this.state.textoPost, this.state.foto)}>
                        <Text style={styles.input} >Publicar posteo</Text>
                    </TouchableOpacity>

                   
                </View>
                }
            </View>

        )
    }

}

const styles= StyleSheet.create ({

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
})

// button:{
//     height: '5vh',
//     padding: 5,
//     marginTop: 20,
//     backgroundColor: '#946F5B',
//     marginTop: 10,
//     textAlign: 'center',
//     fontFamily: 'Raleway, sans-serif;',
//     fontSize:20,
//     fontWeight: 'bold',
//     color: 'white'},

// }),

export default NewPost;