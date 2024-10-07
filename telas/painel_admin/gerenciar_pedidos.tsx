import React, { useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FloatingAction } from 'react-native-floating-action';

const pedidosIniciais = [
    { id: '1', usuario: 'Usuário 1', descricao: 'Pedido de camisetas' },
    { id: '2', usuario: 'Usuário 2', descricao: 'Pedido de adesivos' },
];

const modelosIniciais = [
    { id: '1', nome: 'Modelo de camiseta' },
    { id: '2', nome: 'Modelo de adesivo' },
];

export const GerenciarPedidosScreen = () => {
    const [selectedTab, setSelectedTab] = useState('pedidos');
    const [modelos, setModelos] = useState(modelosIniciais);
    const [isModalVisible, setModalVisible] = useState(false);
    const [novoModeloNome, setNovoModeloNome] = useState('');

    const pedidos = pedidosIniciais;

    const renderPedido = ({ item }: any) => (
        <View style={styles.pedidoItem}>
            <View style={styles.buttonContainer}>
                <Text>{item.descricao} - {item.usuario}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button color={'green'} title="Exibir" onPress={() => excluirPedido(item.id)} />
                </View>
                <View style={styles.button}>
                    <Button title="Alterar" onPress={() => alterarPedido(item.id)} />
                </View>
                <View style={styles.button}>
                    <Button color={'red'} title="Excluir" onPress={() => excluirPedido(item.id)} />
                </View>
            </View>
        </View>
    );

    const renderModelo = ({ item }: any) => (
        <View style={styles.pedidoItem}>
            <View style={styles.buttonContainer}>
                <Text>{item.nome}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button color={'green'} title="Exibir" onPress={() => exibirModelo(item.id)} />
                </View>
                <View style={styles.button}>
                    <Button title="Alterar" onPress={() => alterarModelo(item.id)} />
                </View>
                <View style={styles.button}>
                    <Button color={'red'} title="Excluir" onPress={() => excluirModelo(item.id)} />
                </View>
            </View>
        </View>
    );

    const excluirPedido = (id: string) => {
        Alert.alert('Excluir Pedido', `Pedido com ID: ${id} foi excluído.`);
    };

    const alterarPedido = (id: string) => {
        Alert.alert('Alterar Pedido', `Pedido com ID: ${id} foi alterado.`);
    };

    const excluirModelo = (id: string) => {
        Alert.alert('Excluir Modelo', `Modelo com ID: ${id} foi excluído.`);
    };

    const alterarModelo = (id: string) => {
        Alert.alert('Alterar Modelo', `Modelo com ID: ${id} foi alterado.`);
    };

    const exibirModelo = (id: string) => {
        Alert.alert('Exibir Modelo', `Exibindo detalhes do modelo com ID: ${id}.`);
    };

    // Função para criar novo modelo
    const criarModelo = () => {
        if (novoModeloNome.trim()) {
            const novoModelo = { id: (modelos.length + 1).toString(), nome: novoModeloNome };
            setModelos([...modelos, novoModelo]);
            setNovoModeloNome('');
            setModalVisible(false);
        } else {
            Alert.alert('Erro', 'O nome do modelo não pode estar vazio.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabItem, selectedTab === 'pedidos' && styles.tabItemSelected]}
                    onPress={() => setSelectedTab('pedidos')}
                >
                    <Icon name="assignment" size={20} color={selectedTab === 'pedidos' ? 'white' : 'black'} />
                    <Text style={selectedTab === 'pedidos' ? styles.tabTextSelected : styles.tabText}>Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabItem, selectedTab === 'modelos' && styles.tabItemSelected]}
                    onPress={() => setSelectedTab('modelos')}
                >
                    <Icon name="list" size={20} color={selectedTab === 'modelos' ? 'white' : 'black'} />
                    <Text style={selectedTab === 'modelos' ? styles.tabTextSelected : styles.tabText}>Modelos</Text>
                </TouchableOpacity>
            </View>

            {selectedTab === 'pedidos' ? (
                <View style={styles.contentContainer}>
                    <Text style={styles.subtitle}>Pedidos Feitos pelos Usuários</Text>
                    <FlatList
                        data={pedidos}
                        renderItem={renderPedido}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : (
                <View style={styles.contentContainer}>
                    <Text style={styles.subtitle}>Modelos de Pedidos</Text>
                    <FlatList
                        data={modelos}
                        renderItem={renderModelo}
                        keyExtractor={(item) => item.id}
                    />

                    <FloatingAction
                        floatingIcon={<Icon name='add' color={'white'} size={30}></Icon>}
                        showBackground={false}
                        onPressMain={() => setModalVisible(true)}
                    />
                </View>
            )}

            {/* Modal para criar novo modelo */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Criar Novo Modelo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do modelo"
                            value={novoModeloNome}
                            onChangeText={setNovoModeloNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do modelo"
                            value={novoModeloNome}
                            onChangeText={setNovoModeloNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do modelo"
                            value={novoModeloNome}
                            onChangeText={setNovoModeloNome}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button color={'red'} title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button color={'green'} title="Adicionar" onPress={criarModelo} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#f0f0f0',
    },
    tabItemSelected: {
        backgroundColor: '#4CAF50',
    },
    tabText: {
        fontSize: 12,
        color: 'black',
    },
    tabTextSelected: {
        fontSize: 12,
        color: 'white',
    },
    contentContainer: {
        flex: 1,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 16,
        paddingLeft: 16,
        fontWeight: 'bold',
    },
    pedidoItem: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 4,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
