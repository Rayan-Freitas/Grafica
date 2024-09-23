// @telas/admin.tsx
import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import MeusPedidosScreen from './meus_pedidos';

const { width } = Dimensions.get('window');

// Nomes das telas
const nomeTelaGerenciarPedidos = 'TelaGerenciarPedidos';
const nomeTelaGerenciarClientes = 'TelaGerenciarClientes';
const nomeTelaGerenciarOrcamentos = 'TelaGerenciarOrcamentos';
const nomeTelaRelatorios = 'TelaRelatorios';
const nomeTelaConfiguracoes = 'TelaConfiguracoes';
const nomeTelaAjudaSuporte = 'TelaAjudaSuporte';

const menuItems = [
  { id: '1', title: 'Gerenciar Pedidos', icon: 'list-alt', screen: nomeTelaGerenciarPedidos },
  { id: '2', title: 'Gerenciar Clientes', icon: 'users', screen: nomeTelaGerenciarClientes },
  { id: '3', title: 'Gerenciar Orçamentos', icon: 'money', screen: nomeTelaGerenciarOrcamentos },
  { id: '4', title: 'Relatórios', icon: 'bar-chart', screen: nomeTelaRelatorios },
  { id: '5', title: 'Configurações', icon: 'cog', screen: nomeTelaConfiguracoes },
  { id: '6', title: 'Ajuda e Suporte', icon: 'question-circle', screen: nomeTelaAjudaSuporte },
];

const Stack = createStackNavigator();

const AdminInicioScreen = ({ navigation }: { navigation: any }) => {
  const renderItem = ({ item }: { item: { id: string; title: string; icon: string; screen: string } }) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(item.screen)}>
      <Icon name={item.icon} size={65} color="white" />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const AppNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#16273d',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => {
          if (route.name !== 'AdminInicio' && route.name !== 'Settings') {
            return (
              <TouchableOpacity onPress={() => alert('Logout')}>
                <Icon name="sign-out" size={24} color="white" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            );
          }
          return null;
        },
      }}
    >
      <Stack.Screen name="AdminInicio" component={AdminInicioScreen} options={{ title: 'Menu Admin' }} />
      <Stack.Screen name={nomeTelaGerenciarPedidos} component={MeusPedidosScreen} options={{ title: 'Gerenciar Pedidos' }} />
      <Stack.Screen name={nomeTelaGerenciarClientes} component={telaGerenciarClientes} options={{ title: 'Gerenciar Clientes' }} />
      <Stack.Screen name={nomeTelaGerenciarOrcamentos} component={telaGerenciarOrcamentos} options={{ title: 'Gerenciar Orçamentos' }} />
      <Stack.Screen name={nomeTelaRelatorios} component={telaRelatorios} options={{ title: 'Relatórios' }} />
      <Stack.Screen name={nomeTelaConfiguracoes} component={telaConfiguracoes} options={{ title: 'Configurações' }} />
      <Stack.Screen name={nomeTelaAjudaSuporte} component={telaAjudaSuporte} options={{ title: 'Ajuda e Suporte' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#16273d',
    width: (width / 2) - 30,
    height: width / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  menuText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fakeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Defina componentes falsos para as telas do admin aqui
const telaGerenciarClientes = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Gerenciar Clientes</Text></View>;
const telaGerenciarOrcamentos = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Gerenciar Orçamentos</Text></View>;
const telaRelatorios = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Relatórios</Text></View>;
const telaConfiguracoes = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Configurações</Text></View>;
const telaAjudaSuporte = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Ajuda e Suporte</Text></View>;
