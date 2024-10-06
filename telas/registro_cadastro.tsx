// RegisterScreen.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export const RegisterScreen = () => {
  const [name, setName] = React.useState(''); // Estado para o nome
  const [phone, setPhone] = React.useState(''); // Estado para o celular
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = () => {
    if (!/^\d{10,11}$/.test(phone)) {
      alert('Por favor, insira um número de celular válido (10 ou 11 dígitos).');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    // Implementar lógica de registro aqui
    alert('Conta registrada com sucesso!');
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
        left={<TextInput.Icon icon="account" />} // Ícone para o nome
      />
      <TextInput
        label="Celular"
        value={phone}
        mode="outlined"
        onChangeText={text => setPhone(text)}
        style={styles.input}
        left={<TextInput.Icon icon="phone" />} // Ícone para o celular
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
