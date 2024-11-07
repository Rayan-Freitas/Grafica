import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/telas/navigation';
import logo from '@/assets/images/logo.jpg';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistir o token
import { API_URL } from "@/services/authService"


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token'); // Recupera o token armazenado
      if (token) {
        // Faz a requisição para validar o token
        try {
          const response = await fetch(`${API_URL}/jwt`, {
            method: 'POST',
            headers: {
              Authorization: token, // Passando o token no header
            },
          });

          if (response.status === 200) {
            // Token válido, redireciona para a tela principal
            navigation.navigate('Home');
          } else {
            // Token inválido, apaga o token e continua no login
            await AsyncStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Erro ao validar o token:', error);
          // Caso de erro, continua no login
        }
      }
    };

    checkToken();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      // Chama a função de login do contexto
      await signIn(email, password);
      navigation.navigate('Home');
    } catch (error) {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.icon} />
      <Text style={styles.title}>Gráfica Ideal</Text>
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
      <Button
        mode="contained"
        onPress={() => handleLogin()}
        style={styles.button}
      >
        Entrar
      </Button>
      <Button
        mode="text"
        textColor="green"
        labelStyle={styles.textButton}
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.textButton}
      >
        Ainda não tem uma conta? Criar conta
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
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 175,
    height: 175,
    borderRadius: 50,
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
  textButton: {
    marginTop: 15,
    fontWeight: '700',
  },
});
