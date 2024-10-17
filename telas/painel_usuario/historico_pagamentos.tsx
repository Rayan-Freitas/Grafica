import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Define a interface para o tipo de pagamento
interface Pagamento {
    id: string;
    idPedido: string; // ID do pedido associado
    dataCriacao: string; // Data de criação da pendência
    dataPagamento: string; // Data do pagamento
    valor: string;
    status: string;
    formaPagamento: string; // Forma de pagamento (ex: PIX)
}

// Dados fictícios para os pagamentos
const pagamentosMock: Pagamento[] = [
    {
        id: '1',
        idPedido: 'PED123',
        dataCriacao: '2024-01-01',
        dataPagamento: '2024-01-02',
        valor: 'R$ 50,00',
        status: 'Pago',
        formaPagamento: 'PIX',
    },
    {
        id: '2',
        idPedido: 'PED124',
        dataCriacao: '2024-02-01',
        dataPagamento: '2024-02-02',
        valor: 'R$ 30,00',
        status: 'Pendente',
        formaPagamento: 'PIX',
    },
    {
        id: '3',
        idPedido: 'PED125',
        dataCriacao: '2024-03-01',
        dataPagamento: '2024-03-02',
        valor: 'R$ 20,00',
        status: 'Cancelado',
        formaPagamento: 'PIX',
    },
    // Adicione mais pagamentos conforme necessário
];

const HistoricoPagamentosScreen = () => {
    const [pagamentos, setPagamentos] = useState<Pagamento[]>(pagamentosMock); // Estado que armazena os pagamentos
    const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
    const [selectedPagamento, setSelectedPagamento] = useState<Pagamento | null>(null); // Pagamento selecionado para visualizar detalhes

    // Função para abrir o modal de detalhes do pagamento
    const abrirModalPagamento = (pagamento: Pagamento): void => {
        setSelectedPagamento(pagamento);
        setModalVisible(true);
    };

    // Renderiza cada pagamento da lista
    const renderPagamento = ({ item }: { item: Pagamento }): JSX.Element => (
        <TouchableOpacity style={styles.pagamentoBox} onPress={() => abrirModalPagamento(item)}>
            <Text style={styles.pagamentoData}>{item.dataCriacao}</Text>
            <Text style={styles.pagamentoValor}>Valor: {item.valor}</Text>
            <Text style={styles.pagamentoStatus}>Status: {item.status}</Text>
            <Text style={styles.pagamentoIdPedido}>ID do Pedido: {item.idPedido}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={pagamentos}
                renderItem={renderPagamento}
                keyExtractor={(item) => item.id}
            />

            {/* Modal para visualizar detalhes do pagamento */}
            {selectedPagamento && (
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Detalhes do Pagamento</Text>
                            <Text>ID do Pedido: {selectedPagamento.idPedido}</Text>
                            <Text>Data de Criação: {selectedPagamento.dataCriacao}</Text>
                            <Text>Data de Pagamento: {selectedPagamento.dataPagamento}</Text>
                            <Text>Valor: {selectedPagamento.valor}</Text>
                            <Text>Status: {selectedPagamento.status}</Text>
                            <Text>Forma de Pagamento: {selectedPagamento.formaPagamento}</Text>
                            <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
    pagamentoBox: {
        backgroundColor: '#16273d',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    pagamentoData: {
        color: 'white',
        fontSize: 16,
    },
    pagamentoValor: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    pagamentoStatus: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    pagamentoIdPedido: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
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
});

export default HistoricoPagamentosScreen;
