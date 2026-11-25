import { View, Text, StyleSheet } from "react-native";

export default function Creditos() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>
        Este produto usando a API do TMDB, mas não é endossado nem certificado
        pelo TMDB.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  texto: {
    fontSize: 11,
    color: '#8A90A2',
    textAlign: 'center'
  }
})
