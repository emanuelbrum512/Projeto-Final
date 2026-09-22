import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";

function Detalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const resposta = await fetch("/api.json");
        if (!resposta.ok) throw new Error("Erro ao carregar dados");

        const dados = await resposta.json();
        const listaProdutos = Array.isArray(dados)
          ? dados
          : dados.produtos || [];
        const produtoEncontrado = listaProdutos.find(
          (p) => String(p.id) === String(id),
        );

        setProduto(produtoEncontrado);

        const favoritosSalvos =
          JSON.parse(localStorage.getItem("emporio_favoritos")) || [];
        setFavorito(favoritosSalvos.includes(String(id)));
      } catch (erro) {
        console.error("Erro:", erro);
      }
    }
    carregarDetalhes();
  }, [id]);

  const alternarFavorito = () => {
    const favoritosSalvos =
      JSON.parse(localStorage.getItem("emporio_favoritos")) || [];
    let novosFavoritos;

    if (favorito) {
      novosFavoritos = favoritosSalvos.filter((favId) => favId !== String(id));
    } else {
      novosFavoritos = [...favoritosSalvos, String(id)];
    }

    localStorage.setItem("emporio_favoritos", JSON.stringify(novosFavoritos));
    setFavorito(!favorito);
  };

  if (!produto) {
    return <Loading mensagem="Carregando detalhes do produto..." />;
  }

  return (
    <div className="detalhes-container">
      <Link to="/" className="botao-voltar">
        &laquo; Voltar para o Catálogo
      </Link>

      <div className="detalhes-conteudo">
        <img
          src={
            produto.imagem
              ? produto.imagem
              : "https://via.placeholder.com/400x600"
          }
          alt={`Imagem de ${produto.nome}`}
        />

        <div className="detalhes-info">
          <h1 className="titulo-pagina">{produto.nome}</h1>

          <p>
            <strong>Preço:</strong> R${" "}
            {produto.preco
              ? produto.preco.toFixed(2).replace(".", ",")
              : "0,00"}
          </p>
          <p>
            <strong>Avaliação:</strong> {produto.avaliacao} / 5
          </p>

          <button
            onClick={alternarFavorito}
            className={`botao-favorito ${favorito ? "favorito" : ""}`}
          >
            {favorito ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </button>

          <h2>Descrição</h2>
          <p>{produto.descricao}</p>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
