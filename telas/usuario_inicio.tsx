  // @telas/inicio.tsx
  import React from 'react';
  import { FlatList, TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { createStackNavigator } from '@react-navigation/stack';
  import { useNavigation, useRoute } from '@react-navigation/native'; // Adicionar imports para navegação e rota
import MeusPedidosScreen from './painel_usuario/meus_pedidos';
import OrderCreationScreen from './painel_usuario/criar_pedido';
  const { width } = Dimensions.get('window');

  const nomeTelaCriarPedidos = 'OrderCreationScreen'
  const nomeTelaMeusPedidos = 'TelaMeusPedidos'
  const nomeTelaOrcamentos = 'TelaOrcamentos'
  const nomeTelaMeusDados = 'TelaMeusDados'
  const nomeTelaPromocoesOfertas = 'TelaPromocoesOfertas'
  const nomeTelaAjudaSuporte = 'TelaAjudaSuporte'
  const nomeTelaHistoricoDePagamentos = 'TelaHistoricoDePagamentos'

  const menuItems = [
    { id: '1', title: 'Criar Pedido', icon: 'file-text', screen: nomeTelaCriarPedidos, adminOnly: false },
    { id: '2', title: 'Meus Pedidos', icon: 'list-alt', screen: nomeTelaMeusPedidos, adminOnly: false },
    { id: '3', title: 'Orçamentos', icon: 'money', screen: nomeTelaOrcamentos, adminOnly: false },
    { id: '4', title: 'Meus Dados', icon: 'user-circle', screen: nomeTelaMeusDados, adminOnly: false },
    { id: '5', title: 'Promoções e Ofertas', icon: 'tags', screen: nomeTelaPromocoesOfertas, adminOnly: false },
    { id: '6', title: 'Ajuda e Suporte', icon: 'question-circle', screen: nomeTelaAjudaSuporte, adminOnly: false },
    { id: '7', title: 'Histórico de Pagamentos', icon: 'credit-card', screen: nomeTelaHistoricoDePagamentos, adminOnly: false },
  ];

  // Componentes falsos para as telas
  const telaOrcamentos = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Tela 3</Text></View>;
  const telaMeusDados = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Tela 4</Text></View>;
  const telaPromocoesOfertas = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Tela 5</Text></View>;
  const telaAjudaSuporte = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Tela 6</Text></View>;
  const telaHistoricoDePagamentos = () => <View style={styles.fakeScreen}><Text>Sua tela aqui - Tela 7</Text></View>;

  const Stack = createStackNavigator();

  const HomeScreen = ({ navigation }: { navigation: any }) => {
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
          numColumns={2} // Definimos duas colunas
          columnWrapperStyle={styles.row} // Estilo das linhas
          showsVerticalScrollIndicator={false} // Oculta o indicador de rolagem vertical
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
            // Mostrar o botão de logout somente se não estiver na tela principal ou configurações
            if (route.name !== 'Home' && route.name !== 'Settings') {
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name={nomeTelaCriarPedidos} component={OrderCreationScreen} options={{ title: 'Criar Pedido' }} />
        <Stack.Screen name={nomeTelaMeusPedidos} component={MeusPedidosScreen} options={{ title: 'Meus Pedidos' }} />
        <Stack.Screen name={nomeTelaOrcamentos} component={telaOrcamentos} options={{ title: 'Orçamentos' }} />
        <Stack.Screen name={nomeTelaMeusDados} component={telaMeusDados} options={{ title: 'Meus Dados' }} />
        <Stack.Screen name={nomeTelaPromocoesOfertas} component={telaPromocoesOfertas} options={{ title: 'Promoções e Ofertas' }} />
        <Stack.Screen name={nomeTelaAjudaSuporte} component={telaAjudaSuporte} options={{ title: 'Ajuda e Suporte' }} />
        <Stack.Screen name={nomeTelaHistoricoDePagamentos} component={telaHistoricoDePagamentos} options={{ title: 'Histórico de Pagamentos' }} />
      </Stack.Navigator> //TODO Criar nomes reais e limpar código
    );
  };

  export default function App() {
    return (
      <AppNavigator />
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, // Garante que a lista ocupe o máximo de altura possível e permita rolagem
      paddingTop: 20,
    },
    row: {
      justifyContent: 'space-evenly', // Espaçamento entre os itens nas colunas
      marginBottom: 20, // Espaçamento entre as linhas
    },
    menuItem: {
      backgroundColor: '#16273d',
      width: (width / 2) - 30, // Cada item ocupa metade da largura da tela menos um pequeno espaçamento
      height: width / 2.5, // Altura ajustada para dar uma aparência quadrada, mas não exata
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 10,
    },
    menuText: {
      color: 'white',
      fontSize: 20, // Tamanho grande para o texto
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
