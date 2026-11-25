import {View, Text, Image, ScrollView, StyleSheet} from 'react-native'

export default function Provedores({ titulo, provedores }) {

    if(!provedores || provedores.length === 0) return null

    return(
        <View style={estilos.container}>
            <Text style={estilos.titulo}>{titulo}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {provedores.map((servico) => (
                    <View key={servico.nome} style={estilos.item}>
                    <Image source={{ uri: servico.logo }} style={estilos.logo} />
                    <Text style={estilos.nome} numberOfLines={2}>
                        {servico.nome}
                        </Text>
                        </View>
                ))}
            </ScrollView>
        </View>
    )
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  titulo: {
    color: '#D0D4E0',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8
  },
  item: {
    width: 68,
    alignItems: 'center',
    marginRight: 10
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginBottom: 4
  },
  nome: {
    color: '#D0D4E0',
    fontSize: 11,
    textAlign: 'center'
  }
})