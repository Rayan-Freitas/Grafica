import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/telas/navigation';
import logo from '@/assets/images/logo.jpg'; // Importando a imagem

type LoginCadastroNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export const LoginScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation<LoginCadastroNavigationProp>();

    const handleLogin = () => {
      if (email === 'Fulano' && password === '123456') {
        navigation.navigate('Home');
      } else {
        alert('Credenciais inválidas');
      }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.icon} /> {/* Usando a imagem dos assets */}
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
                textColor='green'
                labelStyle={styles.textButton}
                onPress={() => {
                  navigation.navigate('RegisterScreen');
                }}
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
        width: 175, // Defina a largura da imagem
        height: 175, // Defina a altura da imagem
        borderRadius: 50, // Arredondando as bordas
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
