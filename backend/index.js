require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
  params: {
    language: "pt-BR",
  },
});

function simplificarFilme(filme) {
  return {
    id: filme.id,
    titulo: filme.title,
    ano: filme.release_date ? filme.release_date.slice(0, 4) : null,
    nota:
      typeof filme.vote_average === "number"
        ? Number(filme.vote_average.toFixed(1))
        : 0,
    poster: filme.poster_path
      ? `https://image.tmdb.org/t/p/w342${filme.poster_path}`
      : null,
  };
}

app.get("/", (req, res) => {
  res.json({ app: "OndePassa", status: "online" });
});

app.get("/em-alta", async (req, res) => {
  try {
    const resposta = await tmdbClient.get("/trending/movie/week");
    const filmes = resposta.data.results.map(simplificarFilme);
    res.json({ filmes });
  } catch (erro) {
    console.error(erro);
    res
      .status(502)
      .json({ mensagem: "Não foi possivel consultar o catálogo de filmes." });
  }
});

app.get("/filmes", async (req, res) => {
  const busca = req.query.busca;
  if (!busca || !busca.trim()) {
    return res.status(400).json({ mensagem: "Informe o título de um filme." });
  }

  const termo = busca.trim();
  console.log(`busca: ${termo}`);

  try {
    const resposta = await tmdbClient.get("/search/movie", {
      params: {
        query: termo,
        include_adult: false,
      },
    });
    const filmes = resposta.data.results.map(simplificarFilme);
    res.json({ filmes });
  } catch (erro) {
    console.error(erro);
    res
      .status(502)
      .json({ mensagem: "Não foi possivel consultar o catálogo de filmes." });
  }
});

function simplificarProvedores(lista) {
  if (!lista) return [];
  return lista.map((provedor) => ({
    nome: provedor.provider_name,
    logo: `https://image.tmdb.org/t/p/w92${provedor.logo_path}`,
  }));
}

app.get('/filme', async (req, res) => {
  const id = req.query.id;

  if (!id){
    return res.status(400).json({ mensagem: "Informe o ID do filme." });
  }

  try {
    const resposta = await tmdbClient.get(`/movie/${id}`,{
        params:{
            append_to_response: 'watch/providers'
        }
    })
    const dados = resposta.data;
    const br = dados['watch/providers']?.results?.BR || {}

    res.json({
        ...simplificarFilme(dados),
        duracao: dados.runtime ? dados.runtime : null,
        generos: (dados.genres || []).map((g) => g.name),
        sinopse: dados.overview ? dados.overview : null,
        fundo: dados.backdrop_path ? `https://image.tmdb.org/t/p/w780${dados.backdrop_path}` : null,
        ondeAssistir: {
            assinatura: simplificarProvedores(br?.flatrate),
            compra: simplificarProvedores(br.buy),
            aluguel: simplificarProvedores(br.rent)
        }
    })
  } catch (erro) {
    if (erro.response && erro.response.status === 404) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
    }
    console.error(erro);
    res.status(502).json({ mensagem: "Não foi possível consultar o catálogo de filmes." });
  }
})

app.listen(3000, () => {
  console.log("Backend do OndePassa no ar. Porta: 3000");
});
