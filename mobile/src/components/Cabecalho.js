import { View, Text, StyleSheet } from "react-native";

export default function Cabecalho({ titulo }) {
  return (
    <View style={estilos.container}>
      <View style={estilos.linhaTitulo}>
        <Text style={estilos.emoji}>🍿</Text>
        <Text style={estilos.titulo}>OndePassa</Text>
      </View>
      <Text style={estilos.subtitulo}>
        Descubra onde assistir qualquer filme
      </Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
    linhaTitulo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    emoji: {
        fontSize: 28,
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: '#FFFFFF'
    },
    subtitulo: {
        fontSize: 14,
        color: '#A0A6B8',
        marginTop: 2
    }
})
