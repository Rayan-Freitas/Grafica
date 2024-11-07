import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistir o token
import { API_URL } from '@/services/authService';

type OrderCreationNavigationProp = StackNavigationProp<RootStackParamList, 'OrderCreationScreen'>;

const OrderCreationScreen = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const navigation = useNavigation<OrderCreationNavigationProp>();

  const handleCreateOrder = async () => {
    if (!selectedModel || !quantity || !description) {
      alert('Preencha todos os campos!');
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmOrder = async () => {
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
    try {
      // Faz o POST do pedido com o token JWT no cabeçalho
      const token = await AsyncStorage.getItem('token'); // Recupera o token armazenado
      await axios.post(
        `${API_URL}/pedidos`,
        {
          nome: selectedModel,
          datacriacao: new Date().toUTCString(),
          datapagamento: null,
          dataalteracao: null,
          valor: 0,
          quantidade: parseInt(quantity),
          descricao: description,
          wstatus: null,
          idmodelo: 'id_do_modelo_exemplo',
          idusuario: 'id_do_usuario_exemplo',
          idfuncionariobaixa: null
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        }
      );

      setShowAlert(true); // Exibe o diálogo de opções
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Houve um erro ao criar o pedido. Tente novamente.');
    }
  };

  const handleAlertOption = (option: 'payment' | 'orders') => {
    setShowAlert(false);
    if (option === 'payment') {
      Linking.openURL('https://wa.me/559999999999'); // Substitua pelo número correto do WhatsApp
    } else {
      navigation.navigate('MeusPedidosScreen'); // Navega para a tela de Meus Pedidos
    }
    setSelectedModel(null);
    setQuantity('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ModelSelectionScreen', { onSelectModel: setSelectedModel });
        }}
      >
        <TextInput
          placeholder="Selecione um Modelo"
          value={selectedModel || ''}
          editable={false}
          style={styles.input}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição do Pedido"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Button title="Criar Pedido" onPress={handleCreateOrder} />

      {/* Diálogo de confirmação */}
      <AwesomeAlert
        show={showConfirmDialog}
        title="Confirmação"
        message="Você tem certeza que deseja criar o pedido?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Cancelar"
        cancelButtonColor="#DD6B55"
        onCancelPressed={() => setShowConfirmDialog(false)}
        showConfirmButton={true}
        confirmText="Confirmar"
        confirmButtonColor="#28a745"
        onConfirmPressed={handleConfirmOrder}
      />

      {/* Diálogo de opções após confirmação */}
      <AwesomeAlert
        show={showAlert}
        title="Pedido Criado"
        message="Escolha uma opção:"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Ir para Meus Pedidos"
        cancelButtonColor="#DD6B55"
        onCancelPressed={() => handleAlertOption('orders')}
        showConfirmButton={true}
        confirmText="Ir para o Pagamento"
        confirmButtonColor="#28a745"
        onConfirmPressed={() => handleAlertOption('payment')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  }
});

export default OrderCreationScreen;
