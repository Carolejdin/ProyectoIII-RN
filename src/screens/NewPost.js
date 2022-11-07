import React, {Component} from 'react'
import {Text, TouchableOpacity, View, TextInput } from 'react-native'
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
                <Text>Subir posteo</Text>
                
                    <TextInput  
                        placeholder='Texto posteo'
                        keyboardType='default'
                        //poner propiedad para que sea text area
                        onChangeText={ text => this.setState({textoPost:text}) }
                        value={this.state.textoPost}
                    /> 
                   
                    <TouchableOpacity onPress={()=>this.newPost(this.state.owner, this.state.textoPost, this.state.foto)}>
                        <Text>Publicar posteo</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>

        )
    }

}

export default NewPost;