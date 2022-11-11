import {Text, FlatList, View, StyleSheet, Image} from 'react-native'
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
                    console.log(user) 
                }
            ) 
           
    }

    render(){
        console.log(this.state.user);
        return(
        <View style={styles.scroll}>
            {
                this.state.user.length == 0 ?
                <Text>  </Text> :

                <View >
                <Text style={styles.text}> {this.state.user[0].data.userName} </Text> 
                <Text style={styles.text}> {this.state.user[0].data.owner} </Text> 
                <Text style={styles.text}> {this.state.user[0].data.bio} </Text> 
                <Image
                style={styles.foto}
                source={this.state.user[0].data.foto}
                resizeMode='cover'
                />
                </View>
            }
            
            <Text style={styles.text2}> Lista de sus {this.state.posts.length} posteos  </Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
            />       
        </View>
        )
    }
}
const styles= StyleSheet.create ({



    scroll:{
        flex: 1
    },

    text:{
        fontFamily: 'Oswald, sans-serif',
        color:'white',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        backgroundColor:'#926F5B',
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
        height:400,
        width:400,
        border: '2px solid #ddd',
        borderRadius:9 ,
        padding: 5,
        alignItems:'center'    
        },

})

export default Profile