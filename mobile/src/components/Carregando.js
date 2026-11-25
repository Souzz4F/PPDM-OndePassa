import {View, ActivityIndicator, StyleSheet, Text} from 'react-native'

export default function Carregando({ mensagem = 'Carregando...' }) {

    return(
        <View style={estilos.container}>
            <ActivityIndicator size="large" color="#E0473C" />
            <Text style={estilos.texto}>{mensagem}</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },
    texto: {
        fontSize: 15,
        color: '#D0D4E0'
    }
})