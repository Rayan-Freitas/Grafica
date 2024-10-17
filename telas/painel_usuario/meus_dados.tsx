import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const MeusDadosScreen = () => {
    // Mock de dados do usuário (para exemplo)
    const [dadosUsuario, setDadosUsuario] = useState({
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 98765-4321',
        endereco: 'Rua das Flores, 123',
    });

    // Estados locais para controle dos campos
    const [nome, setNome] = useState(dadosUsuario.nome);
    const [email, setEmail] = useState(dadosUsuario.email);
    const [telefone, setTelefone] = useState(dadosUsuario.telefone);
    const [endereco, setEndereco] = useState(dadosUsuario.endereco);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Função para salvar as alterações
    const salvarAlteracoes = () => {
        if (novaSenha && novaSenha !== confirmarSenha) {
            Alert.alert('Erro', 'A nova senha e a confirmação de senha não coincidem');
            return;
        }
        // Salvar os dados (aqui você pode enviar para uma API)
        const novosDados = {
            nome,
            email,
            telefone,
            endereco,
            // Senha só deve ser enviada se for alterada
            ...(novaSenha && { senha: novaSenha }),
        };
        // Mock de atualização de dados
        setDadosUsuario(novosDados);
        Alert.alert('Sucesso', 'Seus dados foram atualizados com sucesso');
    };

    return (
        <ScrollView style={styles.container}>

            {/* Nome */}
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Telefone */}
            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={(text) => setTelefone(text.replace(/[^0-9]/g, ''))} // Permite apenas números
                keyboardType="numeric"
            />

            {/* Endereço */}
            <Text style={styles.label}>Endereço</Text>
            <TextInput
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
            />

            {/* Alteração de senha
      <Text style={styles.subtitle}>Alterar Senha</Text> */}

            {/* Senha Atual */}
            {/* <Text style={styles.label}>Senha Atual</Text>
      <TextInput
        style={styles.input}
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
        placeholder="Digite sua senha atual"
      /> */}

            {/* Nova Senha */}
            {/* <Text style={styles.label}>Nova Senha</Text>
      <TextInput
        style={styles.input}
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        placeholder="Digite sua nova senha"
      /> */}

            {/* Confirmar Nova Senha */}
            {/* <Text style={styles.label}>Confirmar Nova Senha</Text>
      <TextInput
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        placeholder="Confirme sua nova senha"
      /> */}

            {/* Botão de salvar */}
            <Button title="Salvar Alterações" onPress={salvarAlteracoes} color="#4CAF50" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
    },
});

export default MeusDadosScreen;
