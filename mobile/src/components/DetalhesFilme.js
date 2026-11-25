import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { formatarNota } from "../utils/formatacao";
import backendClient from "../utils/backendClient";
import Carregando from "./Carregando";

export default function DetalhesFilme({ id, onVoltar }) {
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      setCarregando(true);
      setErro(null);
      try {
        const reposta = await backendClient.get("/filme", { params: { id } });
        setFilme(reposta.data);
      } catch (erro) {
        setErro(
          erro.response?.data?.mensagem ||
            "Não foi possível carregar os detalhes.",
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDetalhes();
  }, [id]);

  const linhaInformacoes = filme
    ? [filme.ano, formatarDuracao(filme.duracao), ...filme.generos]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <View style={estilos.container}>
      <Pressable onPress={onVoltar} style={estilos.botaoVoltar}>
        <Text style={estilos.textoVoltar}>{"< Voltar"}</Text>
      </Pressable>

      {carregando ? (
        <Carregando mensagem="Carregando os detalhes..." />
      ) : erro ? (
        <Text style={estilos.erro}>{erro}</Text>
      ) : (
        <ScrollView style={estilos.scroll}>
          {filme.fundo && (
            <Image source={{ uri: filme.fundo }} style={estilos.fundo} />
          )}

          <View style={estilos.cabecalhoFilme}>
            {filme.poster ? (
              <Image source={{ uri: filme.poster }} style={estilos.poster} />
            ) : (
              <View style={estilos.semPoster}>
                <Text style={estilos.textoSemPoster}>Sem pôster</Text>
              </View>
            )}

            <View style={estilos.dadosPrincipais}>
              <Text style={estilos.titulo}>{filme.titulo}</Text>
              {linhaInformacoes.length > 0 && (
                <Text style={estilos.informacoes}>{linhaInformacoes}</Text>
              )}
              <Text style={estilos.nota}>{formatarNota(filme.nota)}</Text>
            </View>
          </View>

          <View style={estilos.secao}>
            <Text style={estilos.tituloSecao}>Sinopse</Text>
            <Text style={estilos.sinopse}>
              {filme.sinopse || "Sinopse indisponível."}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  botaoVoltar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textoVoltar: {
    color: "#E0473C",
    fontSize: 16,
    fontWeight: "bold",
  },
  erro: {
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  scroll: {
    flex: 1,
  },
  fundo: {
    width: "100%",
    height: 180,
  },
  cabecalhoFilme: {
    flexDirection: "row",
    padding: 16,
    gap: 14,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  semPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#3A3F52",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  textoSemPoster: {
    color: "#A0A6B8",
    fontSize: 12,
    textAlign: "center",
  },
  dadosPrincipais: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  informacoes: {
    color: "#A0A6B8",
    fontSize: 14,
  },
  nota: {
    color: "#F5C518",
    fontSize: 16,
    fontWeight: "bold",
  },
  secao: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tituloSecao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  sinopse: {
    color: "#D0D4E0",
    fontSize: 14,
    lineHeight: 20,
  },
});
