
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import home from './src/screens/home';
import userInfo from './src/screens/userInfo';


const screenStack = createStackNavigator();

const App = () => {
 return (
    <NavigationContainer>
      <screenStack.Navigator>
        <screenStack.Screen
          name="home"
          component={home}
          options={{ title: 'Github Users' }}
        />
        <screenStack.Screen 
          name="userInfo"
          component={userInfo}
          options={{ title: ''}}
        />
      </screenStack.Navigator>
    </NavigationContainer>
  );
}

export default App;