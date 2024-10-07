import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/telas/navigation';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;

const PaymentScreen = () => {
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { orderStatus } = route.params;  // Recebe o status do pedido

  const handleWhatsAppRedirect = () => {
    Alert.alert(
      'Redirecionamento',
      'Você está sendo redirecionado para o WhatsApp.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Aqui você pode redirecionar para o WhatsApp
            const whatsappUrl = 'https://wa.me/+5585999999999'; // Substitua pelo número da gráfica
            // Exemplo para abrir o link no navegador
            navigation.navigate('WebViewScreen', { url: whatsappUrl }); // Você também pode usar Linking.openURL se não quiser uma WebView
          },
        },
      ]
    );
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancelar Pedido',
      'Tem certeza de que deseja cancelar o pedido?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            // Lógica para cancelar o pedido (pode ser implementar backend)
            alert('Pedido cancelado com sucesso!');
            navigation.goBack();  // Volta para a tela anterior após o cancelamento
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido: {orderStatus}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleWhatsAppRedirect}>
        <Text style={styles.buttonText}>Ir para Pagamento</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelOrder}>
        <Text style={styles.buttonText}>Cancelar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
});

export default PaymentScreen;
