import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/telas/navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import { TouchableOpacity } from 'react-native-gesture-handler';

type OrderCreationNavigationProp = StackNavigationProp<RootStackParamList, 'OrderCreationScreen'>;

const OrderCreationScreen = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Novo estado para o diálogo de confirmação

  const navigation = useNavigation<OrderCreationNavigationProp>();

  const handleCreateOrder = () => {
    if (!selectedModel || !quantity || !description) {
      alert('Preencha todos os campos!');
      return;
    }

    // Exibe o diálogo de confirmação
    setShowConfirmDialog(true);
  };

  const handleConfirmOrder = () => {
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
    setShowAlert(true); // Exibe o diálogo de opções

    // Aqui você pode adicionar a lógica para criar o pedido
  };

  const handleAlertOption = (option: 'payment' | 'orders') => {
    setShowAlert(false);
    if (option === 'payment') {
      Linking.openURL('https://wa.me/559999999999'); // Substitua pelo número correto do WhatsApp
    } else {
      navigation.navigate('MeusPedidosScreen'); // Navega para a tela de Meus Pedidos
    }
    // Limpar os campos após a ação
    setSelectedModel(null);
    setQuantity('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ModelSelectionScreen', { onSelectModel: setSelectedModel })}
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

      <Button
        title="Criar Pedido"
        onPress={handleCreateOrder}
      />

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
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default OrderCreationScreen;
