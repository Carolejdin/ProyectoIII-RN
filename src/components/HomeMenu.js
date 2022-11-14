//Menu tab de navegación
//Importar toda la estreuctura de navegación

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import ProfileNav from './ProfileNav';
import Profile from '../screens/profile';
import NewPost from '../screens/newPost';
import Buscar from '../screens/Buscar'

const Tab = createBottomTabNavigator();


function HomeMenu(){

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ ProfileNav }  options={
                {tabBarIcon: ()=> <FontAwesome name="home" size={26} color="#926F5B" />} 
            } />
            <Tab.Screen name="Profile" component={ Profile } options={
                {tabBarIcon: ()=> <Ionicons name="person-circle" size={26} color="#926F5B" />}
            } />
            <Tab.Screen name="NewPost" component={ NewPost }  options={
                {tabBarIcon: ()=> <MaterialIcons name="add-a-photo" size={26} color="#926F5B" />}
            }/>
             <Tab.Screen name="Buscar" component={ Buscar }  options={
                {tabBarIcon: ()=> <FontAwesome name="search" size={26} color="#926F5B" />} 
            } />
        </Tab.Navigator>
    )

}

export default HomeMenu;