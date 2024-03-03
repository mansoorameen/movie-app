import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieListScreen from './Screens/MovieListScreen';
import MovieDetailScreen from './Screens/MovieDetailScreen';
import {Provider} from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
          <Stack.Screen
            name="MovieListScreen"
            component={MovieListScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="MovieDetailScreen"
            component={MovieDetailScreen}
            options={{title: 'Movie Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
