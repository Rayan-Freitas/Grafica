import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const RelatoriosScreen = () => {
    // Dados fictícios para os gráficos
    const dadosVendasPorMes = [20, 45, 28, 80, 99, 43]; // Exemplo de vendas por mês
    const dadosModelosMaisVendidos = [
        { name: 'Modelo A', vendas: 215, color: '#FF6384', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Modelo B', vendas: 125, color: '#36A2EB', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Modelo C', vendas: 100, color: '#FFCE56', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];
    const dadosFaturamentoTotal = [300, 500, 700, 200, 900, 1200]; // Exemplo de faturamento por mês

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Gráfico de Vendas por Mês */}
            <Text style={styles.subTitle}>Vendas por Mês</Text>
            <BarChart
                data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        {
                            data: dadosVendasPorMes,
                        },
                    ],
                }}
                width={width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: '#16273d',
                    backgroundGradientFrom: '#16273d',
                    backgroundGradientTo: '#1e2b4d',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={styles.graph}
                yAxisLabel="$" // Adicione o rótulo do eixo Y aqui
                yAxisSuffix="K" // Adicione o sufixo do eixo Y aqui
            />

            {/* Gráfico de Modelos Mais Vendidos */}
            <Text style={styles.subTitle}>Modelos Mais Vendidos</Text>
            <PieChart
                data={dadosModelosMaisVendidos}
                width={width - 30}
                height={220}
                accessor="vendas" // Adicionando o accessor
                backgroundColor="transparent" // Definindo a cor de fundo
                paddingLeft="15" // Definindo o padding à esquerda
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                style={styles.graph}
            />

            {/* Gráfico de Faturamento Total */}
            <Text style={styles.subTitle}>Faturamento Total</Text>
            <LineChart
                data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        {
                            data: dadosFaturamentoTotal,
                        },
                    ],
                }}
                width={width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: '#16273d',
                    backgroundGradientFrom: '#16273d',
                    backgroundGradientTo: '#1e2b4d',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={styles.graph}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Permite que o ScrollView tenha flexibilidade
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    graph: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default RelatoriosScreen;
