import { View, Text, FlatList, StyleSheet } from "react-native";
import CartaoFilme from "./CartaoFilme";

export default function ListaFilmes({ titulo, filmes, onSelecionar }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(filme) => String(filme.id)}
        renderItem={({ item }) => (
          <CartaoFilme
            titulo={item.title}
            ano={item.ano}
            nota={item.nota}
            poster={item.poster}
            onSelecionar={() => onSelecionar(item.id)}
          />
        )}
      />
    </View>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
