import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const ConfiguracoesScreen = () => {
    const [nomeGrafica, setNomeGrafica] = useState('');
    const [emailContato, setEmailContato] = useState('');
    const [telefoneContato, setTelefoneContato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [horarioFuncionamento, setHorarioFuncionamento] = useState('');

    const handleSave = () => {
        // Lógica para salvar as configurações
        console.log('Nome da Gráfica:', nomeGrafica);
        console.log('Email de Contato:', emailContato);
        console.log('Telefone de Contato:', telefoneContato);
        console.log('Endereço:', endereco);
        console.log('Horário de Funcionamento:', horarioFuncionamento);
        // Aqui você pode implementar a chamada para a API ou a lógica de persistência
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Configurações da Gráfica</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome da Gráfica</Text>
                <TextInput
                    style={styles.input}
                    value={nomeGrafica}
                    onChangeText={setNomeGrafica}
                    placeholder="Digite o nome da gráfica"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email de Contato</Text>
                <TextInput
                    style={styles.input}
                    value={emailContato}
                    onChangeText={setEmailContato}
                    placeholder="Digite o email de contato"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone de Contato</Text>
                <TextInput
                    style={styles.input}
                    value={telefoneContato}
                    onChangeText={setTelefoneContato}
                    placeholder="Digite o telefone de contato"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholder="Digite o endereço"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Horário de Funcionamento</Text>
                <TextInput
                    style={styles.input}
                    value={horarioFuncionamento}
                    onChangeText={setHorarioFuncionamento}
                    placeholder="Ex: Seg a Sex: 08:00 - 18:00"
                />
            </View>

            <Button title="Salvar" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#f0f0f0',
    },
});

export default ConfiguracoesScreen;
