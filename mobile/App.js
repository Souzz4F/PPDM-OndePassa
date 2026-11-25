import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";

import Cabecalho from "./src/components/Cabecalho";
import Creditos from "./src/components/Creditos";
import Carregando from "./src/components/Carregando";
import ListaFilmes from "./src/components/ListaFilmes";
import backendClient from "./src/utils/backendClient";
import Busca from "./src/components/Busca";
import DetalhesFilme from "./src/components/DetalhesFilme";

export default function App() {
  const [emAlta, setEmAlta] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  const [termo, setTermo] = useState("");
  const [termoBuscado, setTermoBuscado] = useState("");
  const [resultados, setResultados] = useState(null);

  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  useEffect(() => {
    async function carregarEmAlta() {
      try {
        const resposta = await backendClient.get("/em-alta");
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
  }, [])

  async function buscarFilmes() {

    setCarregando(true);
    try{
      const resposta = await backendClient.get('/filmes', {
        params: {
          busca: termo}})
          setResultados(resposta.data)
          setTermoBuscado(termo)
          setErro(null)
    } catch (erro) {
      setErro(erro.response?.data?.mensagem ||
        "Não foi possível buscar os filmes.",
      )
    } finally {
      setCarregando(false);
    }
  }

  function limparBusca(){
    setTermo("")
    setResultados(null)
    setErro(null)
  }

  function renderizarLista(){
    if (resultados === null){
      return (<ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} onSelecionar={setFilmeSelecionado} />)
    }
    if (resultados.length === 0){
      return (<Text style={estilos.mensagemVazia}>Nenhum filme encontrado para "{termoBuscado}".</Text>)
    }
    return (<ListaFilmes titulo={`Resultados para "${termoBuscado}"`} filmes={resultados} onSelecionar={setFilmeSelecionado} />)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.tela}>
        <Cabecalho />
        {filmeSelecionado !== null ? (<DetalhesFilme id={filmeSelecionado} onVoltar={() => setFilmeSelecionado(null)} />) :(<>
        <Busca
        termo={termo}
        onTermoAlterado={setTermo}
        onBuscar={buscarFilmes}
        onLimpar={limparBusca}
        />
        <View style={estilos.conteudo}>
          {carregando ? (
            <Carregando mensagem={ termo || resultados !== null ? 'procurando filmes...' : 'Buscando os filmes em alta...' } />
          ) : erro ? (
            <Text style={estilos.erro}>{erro}</Text>
          ) : (
            renderizarLista()
          )}
        </View>
        </>)}
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
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
  },
  mensagemVazia: {
    color: '#D0D4E0',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    fontSize: 15
  }
})