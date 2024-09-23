//login_cadastro.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  LoginCadastro: undefined;
  Home: undefined;
};

type LoginCadastroNavigationProp = StackNavigationProp<RootStackParamList, 'LoginCadastro'>;

const LoginCadastro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginCadastroNavigationProp>();

  const handleLogin = () => {
    if (username === 'Fulano' && password === '123456') {
      navigation.navigate('Home');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title="Entrar"
          onPress={handleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#16273d', // Cor de fundo
  },
  header: {
    fontSize: 24,
    color: 'white', // Cor do texto
    marginBottom: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white', // Fundo dos campos de entrada
    color: '#16273d', // Cor do texto de entrada
  },
});

export default LoginCadastro;
