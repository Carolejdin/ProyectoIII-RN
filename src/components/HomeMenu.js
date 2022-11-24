//Menu tab de navegación
//Importar toda la estreuctura de navegación

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import ProfileNav from './ProfileNav';
import Profile from '../screens/profile';
import NewPost from '../screens/newPost';
import Buscar from '../screens/Buscar'
import { auth } from '../firebase/config';
import { Component } from 'react';

const Tab = createBottomTabNavigator();


class HomeMenu extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={ ProfileNav }  
                    options={
                        {
                            tabBarIcon: ()=> <FontAwesome name="home" size={26} color="#926F5B" />,
                            headerShown: false
                        }                     
                    } />

                <Tab.Screen 
                    name="My profile" 
                    component={ Profile }  
                    options={
                        {
                            tabBarIcon: ()=> <Ionicons name="person-circle" size={26} color="#926F5B" />,
                            headerShown: false,
                            tabBarButton: props => (
                                <TouchableOpacity 
                                    {...props} 
                                    onPress={() =>     
                                        this.props.navigation.navigate('Perfil', { email: auth.currentUser.email})
                                    } />
                            )
                        }
                    }/>
                
                <Tab.Screen 
                    name="NewPost" 
                    component={ NewPost }  
                    options={
                        {
                            tabBarIcon: ()=> <MaterialIcons name="add-a-photo" size={26} color="#926F5B" />,
                            headerShown: false,
                        }
                    }/>
                
                <Tab.Screen 
                    name="Buscar" 
                    component={ Buscar }  
                    options={
                        {
                            tabBarIcon: ()=> <FontAwesome name="search" size={26} color="#926F5B" />,
                            headerShown: false,
                        } 
                    } />
            </Tab.Navigator>
        )
    }
}

export default HomeMenu;