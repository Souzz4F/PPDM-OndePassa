import { View, TextInput, Pressable, StyleSheet, Text, ActivityIndicator } from "react-native";

export default function Busca({ termo, onTermoAlterado, buscando, onLimpar}) {

    return (
        <View style={estilos.container}>
            <TextInput
                style={estilos.campo}
                value={termo}
                onChangeText={onTermoAlterado}
                placeholder="Digite o título de um filme"
                placeholderTextColor="#8A90A2"
                />
                {buscando && <ActivityIndicator size="small" color= "#E0473C"/>}
                {termo.length > 0 && (
                    <Pressable onPress={onLimpar} style={estilos.botaoLimpar}>
                        <Text style={estilos.textoLimpar}>x</Text>
                    </Pressable>
                )}
        </View>
    )
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#1C2030',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8
  },
  campo: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15
  },
  botaoLimpar: {
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  textoLimpar: {
    color: '#A0A6B8',
    fontSize: 16,
    fontWeight: 'bold'
  }
})