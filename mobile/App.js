import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.tela}>
        <Cabecalho />
        <View style={estilos.conteudo}/>
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#121521',
  },
  conteudo: {
    flex: 1,
  }
})
