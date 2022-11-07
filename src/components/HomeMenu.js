//Menu tab de navegación
//Importar toda la estreuctura de navegación

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import ProfileNav from './ProfileNav';
import Profile from '../screens/profile';
import NewPost from '../screens/newPost';

const Tab = createBottomTabNavigator();


function HomeMenu(){

    return (
        <Tab.Navigator>
            {/* Aca tiene que ir una navegacion stack con Home y otro profile */}
            <Tab.Screen name="Home" component={ ProfileNav } options={
                {tabBarIcon: ()=> <FontAwesome name="home" size={24} color="black" />}
            } />
            <Tab.Screen name="Profile" component={ Profile } options={
                {tabBarIcon: ()=> <Ionicons name="person-circle" size={24} color="black" />}
            } />
            <Tab.Screen name="NewPost" component={ NewPost }  options={
                {tabBarIcon: ()=> <MaterialIcons name="add-a-photo" size={24} color="black" />}
            }/>
        </Tab.Navigator>
    )

}

export default HomeMenu;