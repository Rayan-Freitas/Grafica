// @telas/GerenciarClientes.tsx
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Dados fictícios para os clientes
const clientesIniciais = [
  { id: '1', nome: 'João Silva', email: 'joao@gmail.com', tipo: 'Cliente' },
  { id: '2', nome: 'Maria Oliveira', email: 'maria@gmail.com', tipo: 'Admin' },
  { id: '3', nome: 'Carlos Souza', email: 'carlos@gmail.com', tipo: 'Cliente' },
  { id: '4', nome: 'Ana Lima', email: 'ana@gmail.com', tipo: 'Cliente' },
];

const GerenciarClientesScreen = () => {
  const [clientes, setClientes] = useState(clientesIniciais);
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('Cliente');

  const abrirModal = (cliente: any = null) => {
    if (cliente) {
      setClienteSelecionado(cliente);
      setNome(cliente.nome);
      setEmail(cliente.email);
      setTipo(cliente.tipo);
    } else {
      setClienteSelecionado(null);
      setNome('');
      setEmail('');
      setTipo('Cliente');
    }
    setIsModalVisible(true);
  };

  const fecharModal = () => {
    setIsModalVisible(false);
    setClienteSelecionado(null);
  };

  const salvarCliente = () => {
    if (!nome || !email || !tipo) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (clienteSelecionado) {
      // Atualizar cliente existente
      setClientes(clientes.map((cliente) =>
        cliente.id === clienteSelecionado.id ? { ...cliente, nome, email, tipo } : cliente
      ));
    } else {
      // Adicionar novo cliente
      const novoCliente = { id: (clientes.length + 1).toString(), nome, email, tipo };
      setClientes([...clientes, novoCliente]);
    }

    fecharModal();
  };

  const excluirCliente = (id: string) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => setClientes(clientes.filter(cliente => cliente.id !== id)) }
      ]
    );
  };

  const renderCliente = ({ item }: { item: { id: string; nome: string; email: string; tipo: string } }) => (
    <TouchableOpacity style={styles.clienteBox} onPress={() => abrirModal(item)}>
      <Icon name="user" size={40} color="white" />
      <View style={styles.infoBox}>
        <Text style={styles.clienteNome}>{item.nome}</Text>
        <Text style={styles.clienteEmail}>{item.email}</Text>
        <Text style={styles.clienteTipo}>{item.tipo}</Text>
      </View>
      <TouchableOpacity onPress={() => excluirCliente(item.id)} style={styles.deleteButton}>
        <Icon name="trash" size={25} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id}
      />

      {/* Botão para adicionar novo cliente */}
      <TouchableOpacity style={styles.addButton} onPress={() => abrirModal()}>
        <Icon name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Adicionar Cliente</Text>
      </TouchableOpacity>

      {/* Modal para criar/editar cliente */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{clienteSelecionado ? 'Editar Cliente' : 'Novo Cliente'}</Text>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Tipo (Admin ou Cliente)"
              value={tipo}
              onChangeText={setTipo}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={fecharModal} color="#ff5c5c" />
              <Button title="Salvar" onPress={salvarCliente} color="#28a745" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  clienteBox: {
    flexDirection: 'row',
    backgroundColor: '#16273d',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  infoBox: {
    flex: 1,
    marginLeft: 15,
  },
  clienteNome: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteEmail: {
    color: 'white',
    fontSize: 14,
  },
  clienteTipo: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
  },
  deleteButton: {
    marginLeft: 15,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GerenciarClientesScreen;
