import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Dados fictícios para os tickets com respostas
const ticketsMock = [
    {
        id: '1', titulo: 'Problema no pedido', mensagem: 'Meu pedido atrasou, o que fazer?', 
        resposta: 'Estamos verificando com a transportadora.', 
        status: 'Respondido', respostas: [
            { autor: 'Cliente', texto: 'Meu pedido atrasou, o que fazer?' },
            { autor: 'Gráfica', texto: 'Estamos verificando com a transportadora.' }
        ]
    },
    {
        id: '2', titulo: 'Dúvida sobre produto', mensagem: 'Gostaria de saber mais sobre a personalização de cartões.', 
        resposta: '', status: 'Aguardando resposta', respostas: [
            { autor: 'Cliente', texto: 'Gostaria de saber mais sobre a personalização de cartões.' }
        ]
    },
    // Adicione mais tickets conforme necessário
];

const AjudaSuporteScreen = () => {
    const [tickets, setTickets] = useState(ticketsMock); // Estado que armazena os tickets
    const [novoTicket, setNovoTicket] = useState({ titulo: '', mensagem: '' }); // Estado para novo ticket
    const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal para criar ticket
    const [modalRespostasVisible, setModalRespostasVisible] = useState(false); // Controle de visibilidade do modal de respostas
    const [selectedTicket, setSelectedTicket] = useState(null); // Ticket selecionado para visualizar detalhes

    // Função para abrir o modal de criação de ticket
    const abrirModalNovoTicket = () => {
        setNovoTicket({ titulo: '', mensagem: '' });
        setModalVisible(true);
    };

    // Função para abrir o modal de respostas do ticket
    const abrirModalRespostas = (ticket) => {
        setSelectedTicket(ticket);
        setModalRespostasVisible(true);
    };

    // Função para enviar um novo ticket
    const enviarTicket = () => {
        if (novoTicket.titulo && novoTicket.mensagem) {
            const novoId = (tickets.length + 1).toString();
            const novoTicketObj = { id: novoId, titulo: novoTicket.titulo, mensagem: novoTicket.mensagem, resposta: '', status: 'Aguardando resposta', respostas: [{ autor: 'Cliente', texto: novoTicket.mensagem }] };
            setTickets([...tickets, novoTicketObj]); // Adiciona o novo ticket à lista
            setModalVisible(false); // Fecha o modal
        } else {
            alert('Preencha todos os campos!');
        }
    };

    // Renderiza cada ticket da lista
    const renderTicket = ({ item }) => (
        <TouchableOpacity style={styles.ticketBox} onPress={() => abrirModalRespostas(item)}>
            <Text style={styles.ticketTitulo}>{item.titulo}</Text>
            <Text style={styles.ticketInfo}>Status: {item.status}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tickets}
                renderItem={renderTicket}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<Text style={styles.header}>Meus Tickets</Text>}
            />

            {/* Botão para criar novo ticket */}
            <TouchableOpacity style={styles.botaoNovoTicket} onPress={abrirModalNovoTicket}>
                <Text style={styles.botaoTexto}>Enviar Novo Ticket</Text>
            </TouchableOpacity>

            {/* Modal para criar novo ticket */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Ticket</Text>
                        <TextInput
                            placeholder="Título"
                            value={novoTicket.titulo}
                            onChangeText={(text) => setNovoTicket({ ...novoTicket, titulo: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Mensagem"
                            value={novoTicket.mensagem}
                            onChangeText={(text) => setNovoTicket({ ...novoTicket, mensagem: text })}
                            style={styles.input}
                            multiline
                        />
                        <Button title="Enviar Ticket" onPress={enviarTicket} />
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal para visualizar respostas do ticket */}
            {selectedTicket && (
                <Modal animationType="slide" transparent={true} visible={modalRespostasVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Ticket: {selectedTicket.titulo}</Text>
                            <FlatList
                                data={selectedTicket.respostas}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.respostaBox}>
                                        <Text style={styles.respostaAutor}>{item.autor}:</Text>
                                        <Text style={styles.respostaTexto}>{item.texto}</Text>
                                    </View>
                                )}
                            />
                            <Button title="Fechar" onPress={() => setModalRespostasVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    ticketBox: {
        backgroundColor: '#16273d',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    ticketTitulo: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ticketInfo: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    botaoNovoTicket: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    botaoTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    respostaBox: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '100%',
    },
    respostaAutor: {
        fontWeight: 'bold',
    },
    respostaTexto: {
        marginTop: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default AjudaSuporteScreen;
