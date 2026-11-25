import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import Cabecalho from "./src/components/Cabecalho";
import Creditos from "./src/components/Creditos";
import Carregando from "./src/components/Carregando";
import ListaFilmes from "./src/components/ListaFilmes";
import backendClient from "./src/utils/backendClient";

export default function App() {
  const [emAlta, setEmAlta] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarEmAlta() {
      try {
        const resposta = await backendClient.get("/filmes/em-alta");
        setEmAlta(resposta.data);
      } catch (erro) {
        setErro(
          "Não foi possível carregar os filmes. Verifique se o backend esta no ar.",
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarEmAlta();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.tela}>
        <Cabecalho />
        <View style={estilos.conteudo}>
          {carregando ? (
            <Carregando mensagem="Buscando os filmes em alta..." />
          ) : erro ? (
            <Text style={estilos.erro}>{erro}</Text>
          ) : (
            <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
          )}
        </View>
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#121521'
  },
  conteudo: {
    flex: 1
  },
  erro: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    fontSize: 15
  }
})