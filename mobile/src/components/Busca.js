import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";

export default function Busca({ termo, onTermoAlterado, onBuscar, onLimpar}) {

    return (
        <View style={estilos.container}>
            <TextInput
                style={estilos.campo}
                value={termo}
                onChangeText={onTermoAlterado}
                placeholder="Digite o nome do filme"
                placeholderTextColor="#8A90A2"
                />
                {termo.length > 0 && (
                    <Pressable onPress={onLimpar} style={estilos.botaoLimpar}>
                        <Text style={estilos.textoLimpar}>x</Text>
                    </Pressable>
                )}
                <Pressable onPress={onBuscar} style={estilos.botaoBuscar}>
                    <Text style={estilos.textoBuscar}>Buscar</Text>
                </Pressable>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1C2030',
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8
  },
  campo: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15
  },
  botaoLimpar: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  textoLimpar: {
    color: '#A0A6B8',
    fontSize: 16,
    fontWeight: 'bold'
  },
  botaoBuscar: {
    backgroundColor: '#E0473C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  textoBuscar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14
  }
})