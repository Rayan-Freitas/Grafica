// @telas/meusPedidos.tsx
import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, View, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// Dados fictícios para os pedidos
const pedidos = [
  { id: '1', titulo: 'Pedido 001', data: '2024-09-21', status: 'Entregue', total: 'R$ 500,00', modelo: 'Modelo A', quantidade: '100', descricao: 'Descrição do pedido 001' },
  { id: '2', titulo: 'Pedido 002', data: '2024-09-20', status: 'Aguardando pagamento', total: 'R$ 300,00', modelo: 'Modelo B', quantidade: '200', descricao: 'Descrição do pedido 002' },
  { id: '3', titulo: 'Pedido 003', data: '2024-09-19', status: 'Em produção', total: 'R$ 150,00', modelo: 'Modelo C', quantidade: '150', descricao: 'Descrição do pedido 003' },
  { id: '4', titulo: 'Pedido 004', data: '2024-09-18', status: 'Cancelado', total: 'R$ 200,00', modelo: 'Modelo D', quantidade: '250', descricao: 'Descrição do pedido 004' },
  { id: '5', titulo: 'Pedido 005', data: '2024-09-17', status: 'Entregue', total: 'R$ 700,00', modelo: 'Modelo E', quantidade: '300', descricao: 'Descrição do pedido 005' },
  { id: '6', titulo: 'Pedido 006', data: '2024-09-16', status: 'Aguardando pagamento', total: 'R$ 350,00', modelo: 'Modelo F', quantidade: '400', descricao: 'Descrição do pedido 006' },
  // Adicione mais pedidos, se desejar
];

const MeusPedidosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);

  // Função para abrir o modal com os dados do pedido
  const abrirModal = (pedido: any) => {
    setPedidoSelecionado(pedido);
    setModalVisible(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisible(false);
    setPedidoSelecionado(null);
  };

  // Renderiza cada pedido
  const renderPedido = ({ item }: { item: { id: string; titulo: string; data: string; status: string; total: string } }) => (
    <TouchableOpacity style={styles.pedidoBox} onPress={() => abrirModal(item)}>
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

      {/* Modal para exibir detalhes do pedido */}
      {pedidoSelecionado && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={fecharModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{pedidoSelecionado.titulo}</Text>
              <Text style={styles.modalInfo}>Data: {pedidoSelecionado.data}</Text>
              <Text style={styles.modalInfo}>Status: {pedidoSelecionado.status}</Text>
              <Text style={styles.modalInfo}>Total: {pedidoSelecionado.total}</Text>
              <Text style={styles.modalInfo}>Modelo: {pedidoSelecionado.modelo}</Text>
              <Text style={styles.modalInfo}>Quantidade: {pedidoSelecionado.quantidade}</Text>
              <Text style={styles.modalInfo}>Descrição: {pedidoSelecionado.descricao}</Text>

              <Button title="Fechar" onPress={fecharModal} />
            </View>
          </View>
        </Modal>
      )}
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MeusPedidosScreen;
