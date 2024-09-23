import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import HomeScreen from './inicio';
import LoginCadastro from './login_cadastro';
import AdminScreen from './admin_inicio';

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
        backgroundColor: '#16273d', // Cor de fundo das abas inferiores
      },
      tabBarActiveTintColor: 'white', // Cor dos ícones ativos
      tabBarInactiveTintColor: '#ccc', // Cor dos ícones inativos
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
        backgroundColor: '#16273d', // Cor de fundo da aba superior
      },
      headerTintColor: 'white', // Cor do texto da aba superior
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="LoginCadastro" component={LoginCadastro} options={{ headerShown: false }} />
    <Stack.Screen
      name="Home"
      component={HomeTabs}
      options={{
        title: 'Gráfica',
        headerLeft: () => null, // Remove o ícone de voltar
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
