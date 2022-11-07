import {Text, FlatList, View} from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'
import React, { Component } from 'react';
import Post from '../components/Post'


class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:[],
            email:'',
            miniBio:'',
            foto:'',
            cantPost:'', 
            posts:[]
        }
    }


    componentDidMount(){
        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
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
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
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

    render(){
        console.log(this.state.user);
        return(
        <View>
            {
                this.state.user.length == 0 ?
                <Text>  </Text> :
                <Text> {this.state.user[0].data.userName} </Text>
            }
            <Text> Lista de posteos</Text>
            <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
            />       
        </View>
        )
    }
}

export default Profile