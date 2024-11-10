import React, { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, Dimensions, TouchableOpacity, Modal, ActivityIndicator, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistir o token

const { width } = Dimensions.get('window');

const MeusPedidosScreen = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar pedidos
  const fetchPedidos = async () => {
    setIsLoading(true); // Ativa o indicador de carregamento
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://graficaserver-production.up.railway.app/pedidos', {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Usando uma string vazia se o token for nulo
        },
      });

      const data = await response.json();
      console.log(data)
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setIsLoading(false); // Desativa o indicador de carregamento
    }
  };

  // Chama a busca de pedidos ao carregar a tela
  useEffect(() => {
    fetchPedidos();
  }, []);

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
  const renderPedido = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.pedidoBox} onPress={() => abrirModal(item)}>
      <Icon name="file-text" size={45} color="white" />
      <Text style={styles.pedidoTitulo}>{item.nome}</Text>
      <Text style={styles.pedidoInfo}>Data: {item.datacriacao}</Text>
      <Text style={styles.pedidoInfo}>Status: {item.wstatus}</Text>
      <Text style={styles.pedidoInfo}>Total: R$ {item.valor}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão de busca manual */}
      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={fetchPedidos} color="#16273d" />
      </View>

      {/* Carregando pedidos */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#16273d" style={styles.loadingIndicator} />
      ) : pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          renderItem={renderPedido}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
      )}

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
              <Text style={styles.modalTitle}>{pedidoSelecionado.nome}</Text>
              <Text style={styles.modalInfo}>Data: {pedidoSelecionado.datacriacao}</Text>
              <Text style={styles.modalInfo}>Status: {pedidoSelecionado.wstatus}</Text>
              <Text style={styles.modalInfo}>Total: R$ {pedidoSelecionado.valor}</Text>
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
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  pedidoBox: {
    backgroundColor: '#16273d',
    width: (width / 2) - 20,
    height: width / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
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
  emptyText: {
    color: '#666',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
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
