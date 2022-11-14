import {Text, FlatList, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'
import React, { Component } from 'react';
import Post from '../components/Post'
import { computeWindowedRenderLimits } from 'react-native/Libraries/Lists/VirtualizeUtils';


class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:[],
            email:'',
            miniBio:'',
            foto:'',
            cantPost:'', 
            posts:[],
        }
    }


    componentDidMount(){
            db.collection('posts').where('owner', '==', this.props.route.params == undefined ? auth.currentUser.email : this.props.route.params.email).onSnapshot( 
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
            db.collection('users').where('owner', '==', this.props.route.params == undefined ? auth.currentUser.email : this.props.route.params.email).onSnapshot(
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
    
    logOut(){
        auth.signOut()
        .then( res => {
            this.props.navigation.navigate('Login')
        })
        .catch(error => console.log('error'))
    }
    

    render(){
        console.log(this.state.user)
        return(
        <View style={styles.scroll}>
            {
                this.state.user.length == 0 ?
                <Text>  </Text> :

                <View style={styles.container}>
                <View style={styles.textContainer}> 
                <Text style={styles.text}> Nombre de usuario: {this.state.user[0].data.userName} </Text> 
                <Text style={styles.text}> Email: {this.state.user[0].data.owner} </Text> 
                <Text style={styles.text}> Bibliografia: {this.state.user[0].data.bio} </Text> 
                </View>
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
                <TouchableOpacity style={styles.text} onPress={()=> this.logOut()} >
                <Text style={styles.logout}>Log out</Text>
                </TouchableOpacity> :
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
        height:75,
        width:75,
        marginTop: 10,
        borderRadius:'50%',
        padding: 5,  
        },

    container:{
        display: 'flex',
        flexDirection:'row',
        width: '100%',
        backgroundColor:'#926F5B',
    },

    textContainer:{
        flexDirection:'wrap',
        marginTop: 20,
    },

    logout:{
        backgroundColor: '#946F5B',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif;',
        fontSize:20,
        fontWeight: 'bold',
        color: 'white'
    }

})

export default Profile