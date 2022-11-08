import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/Profile';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

function ProfileNav() {
  return (
    //Plantear la navegación
     <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options={{headerShown: false}}/>
        
        <Stack.Screen name="OtrosPerfiles" component={ Profile } />    
     </Stack.Navigator>
  
  );
}

export default ProfileNav;