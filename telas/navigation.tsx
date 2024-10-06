import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import HomeScreen from './inicio';
import AdminScreen from './admin_inicio';
import { LoginScreen } from './login_cadastro';
import RegisterScreen from './registro_cadastro'; // Importe sua nova tela de registro

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName = 'home';
        if (route.name === 'Admin') {
          iconName = 'cog';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        backgroundColor: '#16273d',
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#ccc',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Admin" component={AdminScreen} />
  </Tab.Navigator>
);

const Navigation = () => (
  <Stack.Navigator
    initialRouteName="LoginCadastro"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#16273d',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="LoginCadastro" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Registrar-se' }} />
    <Stack.Screen
      name="Home"
      component={HomeTabs}
      options={{
        title: 'Gráfica',
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity onPress={() => alert('Logout')}>
            <Icon name="sign-out" size={24} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

export default Navigation;
