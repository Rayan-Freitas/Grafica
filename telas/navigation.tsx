import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import HomeScreen from './usuario_inicio';
import AdminScreen from './admin_inicio';
import { LoginScreen } from './inicio/login_cadastro';
import RegisterScreen from './inicio/registro_cadastro';
import OrderCreationScreen from './painel_usuario/criar_pedido';
import ModelSelectionScreen from './painel_usuario/selecionar_modelos_pedidos';
import PaymentScreen from './painel_usuario/pagamento_pedido';
import MeusPedidosScreen from './painel_usuario/meus_pedidos';
import GerenciarClientesScreen from './painel_admin/gerenciar_clientes';
import { AuthContext } from '@/context/AuthContext';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Home: undefined;
  OrderCreationScreen: undefined;
  PaymentScreen: { orderStatus: any };
  WebViewScreen: { url: any };
  ModelSelectionScreen: { onSelectModel: (model: string) => void };
  MeusPedidosScreen: undefined;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Definir o tipo de navigation para o SignOutButton
type SignOutButtonProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
};

// Componente para renderizar o ícone de logout
const SignOutButton = ({ navigation }: SignOutButtonProps) => {
  const { signOut } = useContext(AuthContext); // Hook dentro do componente funcional

  const handleSignOut = () => {
    signOut();
    // Reseta a navegação para a tela LoginScreen
    navigation.reset({
      index: 0,  // Reseta a pilha e começa da tela de login
      routes: [{ name: 'LoginScreen' }],  // A tela 'LoginScreen' será a primeira da pilha
    });
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Icon name="sign-out" size={24} color="white" style={{ marginRight: 15 }} />
    </TouchableOpacity>
  );
};

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
    initialRouteName="LoginScreen"
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
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Registrar-se' }} />
    <Stack.Screen
      name="Home"
      component={HomeTabs}
      options={({ navigation }) => ({
        title: 'Gráfica',
        headerLeft: () => null,
        headerRight: () => <SignOutButton navigation={navigation} />, // Passando a navegação para o SignOutButton
      })}
    />
    <Stack.Screen name="OrderCreationScreen" component={OrderCreationScreen} options={{ title: 'Criar Pedido' }} />
    <Stack.Screen name="ModelSelectionScreen" component={ModelSelectionScreen} options={{ title: 'Selecionar Modelo' }} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Pagamento' }} />
    <Stack.Screen name="MeusPedidosScreen" component={MeusPedidosScreen} options={{ title: 'Meus Pedidos' }} />
    <Stack.Screen name="GerenciarClientesScreen" component={GerenciarClientesScreen} options={{ title: 'Gerenciar Clientes' }} />
  </Stack.Navigator>
);

export default Navigation;
