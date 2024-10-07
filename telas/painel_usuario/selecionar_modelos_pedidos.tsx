import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/telas/navigation';

type ModelSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  'ModelSelectionScreen'
>;

type ModelSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ModelSelectionScreen'
>;

const modelOptions = [
  'Modelo A',
  'Modelo B',
  'Modelo C',
  'Modelo D',
];

const ModelSelectionScreen = () => {
  const navigation = useNavigation<ModelSelectionScreenNavigationProp>();
  const route = useRoute<ModelSelectionScreenRouteProp>();
  const { onSelectModel } = route.params;

  const handleModelSelect = (model: string) => {
    onSelectModel(model);
    navigation.goBack(); // Retorna à tela de criação de pedido
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Modelo</Text>
      <FlatList
        data={modelOptions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modelItem}
            onPress={() => handleModelSelect(item)}
          >
            <Text style={styles.modelText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
  modelItem: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  modelText: {
    fontSize: 18,
    color: '#333',
  },
});

export default ModelSelectionScreen;
