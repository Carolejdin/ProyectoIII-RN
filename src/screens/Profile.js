import {Text, FlatList, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'
import "firebase/auth";
import React, { Component } from 'react';
import Post from '../components/Post'




class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:[],
            currentEmail: '',
            posts:[],
        }
    }


    componentDidMount(){

        const profileEmail = this.props.route.params.email;

        db.collection('posts').where('owner', '==', profileEmail).onSnapshot( 
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                }) 
            }
        )
        db.collection('users').where('owner', '==', profileEmail).onSnapshot(
            docs => {
                let user = [];
                docs.forEach( doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        user: user
                    })
                }) 
            }
        ) 
    }

    componentDidUpdate(){

        const profileEmail = this.props.route.params.email;

        if (this.state.currentEmail === profileEmail) return;
        // si el email que entro pro props es igual al actual frenar el bucle, corta la funcion

        this.setState({
            posts: [],
            user: [],
            currentEmail: profileEmail
        })

        db.collection('posts').where('owner', '==', profileEmail).onSnapshot( 
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        currentEmail: profileEmail
                    })
                }) 
            }
        )
        db.collection('users').where('owner', '==', profileEmail).onSnapshot(
            docs => {
                let user = [];
                docs.forEach( doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        user: user,
                        currentEmail: profileEmail
                    })
                }) 
            }
        ) 
    }
    
    logOut(){
        auth.signOut()
        .then(res => {
            this.props.navigation.navigate('Login')
        })
        .catch(error => console.log('error'))
    }

    eliminarPerfil(){
        const user = firebase.auth().currentUser;

            user.delete().then(() => {
            this.setState({
                user:[]
            })
            })
        .catch((error) => {
        });
    }


    borrarUser(){
        db.collection('users')
        .doc(auth.currentUser.id)
        .delete()
    }

    render(){
        return(
        <View style={styles.scroll}>
            {
                this.state.user.length == 0 ?
                <Text>  </Text> :

                <View style={styles.container}>
                <Text style={styles.text}> {this.state.user[0].data.userName} </Text> 
                <Text style={styles.text}> {this.state.user[0].data.owner} </Text> 
                <Text style={styles.text}> {this.state.user[0].data.bio} </Text> 
                { <Image
                style={styles.foto}
                source={this.state.user[0].data.foto}
                resizeMode='cover'
                /> }
                </View>
            }
            
            <Text style={styles.text2}> Lista de sus {this.state.posts.length} posteos  </Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation}  />}
            />    

            {
                this.state.user.length == 0 ?
                    <Text>  </Text> :
                this.state.user[0].data.owner == auth.currentUser.email ?
                <View>
                <TouchableOpacity style={styles.text} onPress={()=> this.logOut()} >
                <Text>Log out</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.text} onPress={()=> this.eliminarPerfil()} onLongPress={()=> this.borrarUser()} >
                 <Text>Borrar perfil</Text>
                </TouchableOpacity> 
                </View>
                :
                <Text></Text>
            }   

        </View>
        )
        
    }
}
const styles= StyleSheet.create ({



    scroll:{
        flex: 2
    },

    text:{
        fontFamily: 'Oswald, sans-serif',
        color:'white',
        fontWeight: 'bold',
        fontSize: 20,
        flexDirection: 'column',
    },
    
    text2:{
       backgroundColor:'#D3B9AA',
       color: 'white',
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',  
        },

    foto:{
        height:200,
        width:200,
        borderRadius:'50%',
        padding: 5,  
        },

    container:{
        display: 'flex',
        flexDirection:'row',
        width: '100%',
        backgroundColor:'#926F5B',
    }

})

export default Profile