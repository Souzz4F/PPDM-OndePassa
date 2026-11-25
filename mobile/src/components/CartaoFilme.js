import { View, Text, Image, StyleSheet } from "react-native";
import { formatarNota } from "../utils/formatacao";

export default function CartaoFilme({ titulo, ano, nota, poster }) {
  return (
    <View style={estilos.cartao}>
      {poster ? (
        <Image source={{ uri: poster }} style={estilos.poster} />
      ) : (
        <View style={estilos.semPoster}>
          <Text style={estilos.textoSemPoster}>Sem pôster</Text>
        </View>
      )}
      <View style={estilos.info}>
        <Text style={estilos.titulo} numberofLines={2}>
          {titulo}
        </Text>
        {ano && <Text style={estilos.ano}>{ano}</Text>}
        <Text style={estilos.nota}>{formatarNota(nota)}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
   flexDirection: 'row',
    backgroundColor: '#1C2030',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    gap: 12
  },
  poster: {
    width: 70,
    height: 105,
    borderRadius: 6
  },
  semPoster: {
    width: 70,
    height: 105,
    borderRadius: 6,
    backgroundColor: '#3A3F52',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  textoSemPoster: {
    color: '#A0A6B8',
    fontSize: 11,
    textAlign: 'center'
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 4
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  ano: {
    color: '#A0A6B8',
    fontSize: 14
  },
  nota: {
    color: '#F5C518',
    fontSize: 14,
    fontWeight: 'bold'
  }
})