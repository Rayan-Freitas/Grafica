// @telas/meusPedidos.tsx
import React from 'react';
import { FlatList, Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// Dados fictícios para os pedidos
const pedidos = [
  { id: '1', titulo: 'Pedido 001', data: '2024-09-21', status: 'Entregue', total: 'R$ 500,00' },
  { id: '2', titulo: 'Pedido 002', data: '2024-09-20', status: 'Aguardando pagamento', total: 'R$ 300,00' },
  { id: '3', titulo: 'Pedido 003', data: '2024-09-19', status: 'Em produção', total: 'R$ 150,00' },
  { id: '4', titulo: 'Pedido 004', data: '2024-09-18', status: 'Cancelado', total: 'R$ 200,00' },
  { id: '5', titulo: 'Pedido 005', data: '2024-09-17', status: 'Entregue', total: 'R$ 700,00' },
  { id: '6', titulo: 'Pedido 006', data: '2024-09-16', status: 'Aguardando pagamento', total: 'R$ 350,00' },
  // Adicione mais pedidos, se desejar
];

const MeusPedidosScreen = () => {
  // Renderiza cada pedido
  const renderPedido = ({ item }: { item: { id: string; titulo: string; data: string; status: string; total: string } }) => (
    <TouchableOpacity style={styles.pedidoBox}>
      <Icon name="file-text" size={45} color="white" />
      <Text style={styles.pedidoTitulo}>{item.titulo}</Text>
      <Text style={styles.pedidoInfo}>Data: {item.data}</Text>
      <Text style={styles.pedidoInfo}>Status: {item.status}</Text>
      <Text style={styles.pedidoInfo}>Total: {item.total}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item) => item.id}
        numColumns={2} // Definimos duas colunas, como na tela principal
        columnWrapperStyle={styles.row} // Estilo das linhas para espaçamento
        showsVerticalScrollIndicator={false} // Remove o indicador de rolagem
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que o FlatList ocupe todo o espaço disponível
    paddingTop: 20,
  },
  row: {
    justifyContent: 'center', // Espaçamento entre os itens
    marginBottom: 20,
  },
  pedidoBox: {
    backgroundColor: '#16273d',
    width: (width / 2) - 20, // Ajuste de largura para duas colunas
    height: width / 2.5, // Altura proporcional
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5, // Margem horizontal entre as colunas
  },
  pedidoTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  pedidoInfo: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
  },
});

export default MeusPedidosScreen;
