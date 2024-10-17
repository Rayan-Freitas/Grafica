import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Modal, TextInput, ScrollView } from 'react-native';

// Definindo a interface para os tickets
interface Ticket {
    id: string;
    cliente: string;
    mensagem: string;
    status: string;
}

// Dados fictícios para os tickets
const ticketsData: Ticket[] = [
    { id: '1', cliente: 'Cliente A', mensagem: 'Como posso resetar minha senha?', status: 'Aberto' },
    { id: '2', cliente: 'Cliente B', mensagem: 'Meu pedido não chegou.', status: 'Aberto' },
    { id: '3', cliente: 'Cliente C', mensagem: 'Preciso de ajuda com a minha conta.', status: 'Aberto' },
    { id: '4', cliente: 'Cliente C', mensagem: 'Preciso de ajuda com a minha conta.', status: 'Aberto' },
];

const AjudaSuporteScreen = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [resposta, setResposta] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setResposta(''); // Limpa a resposta ao selecionar um novo ticket
        setModalVisible(true); // Abre o modal ao selecionar um ticket
    };

    const handleSendResponse = () => {
        if (selectedTicket) {
            // Lógica para enviar a resposta (ex: API call)
            console.log('Resposta enviada para o ticket:', selectedTicket.id);
            console.log('Resposta:', resposta);
            setModalVisible(false); // Fecha o modal após enviar a resposta
            setSelectedTicket(null); // Limpa o ticket selecionado
            setResposta(''); // Limpa o campo de resposta
        } else {
            console.error('Nenhum ticket selecionado para enviar a resposta.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Ajuda e Suporte</Text>

            <FlatList
                data={ticketsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.ticketItem}>
                        <Text style={styles.ticketTitle}>{item.cliente}</Text>
                        <Text>{item.mensagem}</Text>
                        <Button title="Ver Detalhes" onPress={() => handleSelectTicket(item)} />
                    </View>
                )}
            />

            {/* Modal para responder ao ticket */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalhes do Ticket</Text>
                        {selectedTicket && (
                            <>
                                <Text style={styles.ticketDetailsLabel}>Cliente: {selectedTicket.cliente}</Text>
                                <Text style={styles.ticketDetailsLabel}>Mensagem: {selectedTicket.mensagem}</Text>
                                <Text style={styles.ticketDetailsLabel}>Status: {selectedTicket.status}</Text >
                            </>
                        )}
                        <TextInput
                            style={styles.responseInput}
                            value={resposta}
                            onChangeText={setResposta}
                            placeholder="Digite sua resposta aqui..."
                            multiline
                        />

                        <Button title="Enviar Resposta" onPress={handleSendResponse} />
                        <Button title="Fechar" onPress={() => setModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>
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
        textAlign: 'center',
        marginBottom: 20,
    },
    ticketItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    ticketTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    ticketDetailsLabel: {
        fontSize: 16,
        marginVertical: 5,
    },
    responseInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        width: '100%', // Largura total
    },
});

export default AjudaSuporteScreen;
