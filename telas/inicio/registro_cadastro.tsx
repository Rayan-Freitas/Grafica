// RegisterScreen.tsx
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthContext } from '@/context/AuthContext'; // Importando o contexto de autenticação

export const RegisterScreen = () => {
  const [name, setName] = useState(''); // Estado para o nome
  const [phone, setPhone] = useState(''); // Estado para o celular
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { signUp } = useContext(AuthContext); // Obtendo a função de registro do contexto

  const handleRegister = async () => {
    if (!/^\d{10,11}$/.test(phone)) {
      alert('Por favor, insira um número de celular válido (10 ou 11 dígitos).');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      // Chamando a função de registro do contexto com os dados necessários
      await signUp( email, password, name );
      alert('Conta registrada com sucesso!');
    } catch (error) {
      alert('Erro ao registrar conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar-se</Text>
      <TextInput
        label="Nome"
        value={name}
        mode="outlined"
        onChangeText={text => setName(text)}
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="Celular"
        value={phone}
        mode="outlined"
        onChangeText={text => setPhone(text)}
        style={styles.input}
        left={<TextInput.Icon icon="phone" />}
      />
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={text => setEmail(text)}
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />
      <TextInput
        label="Senha"
        value={password}
        mode="outlined"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
      />
      <TextInput
        label="Confirmar Senha"
        value={confirmPassword}
        mode="outlined"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Registrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#16273d',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#16273d',
    padding: 10,
    borderRadius: 5,
  },
});

export default RegisterScreen;
