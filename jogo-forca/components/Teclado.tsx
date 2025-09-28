import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Lista de letras do alfabeto
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ'.split('');

// tipo das props que o componente vai receber
type TecladoProps = {
  onLetraPressionada: (letra: string) => void;
};

export default function Teclado({ onLetraPressionada }: TecladoProps) {
  return (
    <View style={styles.container}>
      {/* usei o .map para criar um botão para cada letra */}
      {LETRAS.map((letra) => (
        <TouchableOpacity
          key={letra}
          style={styles.botao}
          // Quando o botão é pressionado, chama a função que é passada via props
          onPress={() => onLetraPressionada(letra)}
        >
          <Text style={styles.textoBotao}>{letra}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Organiza os botões em linhas
    flexWrap: 'wrap',     // Permite que os botões quebrem para a próxima linha
    justifyContent: 'center',
    marginTop: 20,
  },
  botao: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    margin: 4,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
