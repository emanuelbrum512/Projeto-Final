import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";

function Detalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const resposta = await fetch("/api.json");

        if (!resposta.ok) {
          throw new Error("Erro ao carregar o arquivo de dados");
        }

        const dados = await resposta.json();
        const listaProdutos = Array.isArray(dados)
          ? dados
          : dados.produtos || [];

        const produtoEncontrado = listaProdutos.find(
          (p) => String(p.id) === String(id),
        );

        setProduto(produtoEncontrado);
      } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
      }
    }

    carregarDetalhes();
  }, [id]);

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

          <h2>Descrição</h2>
          <p>{produto.descricao}</p>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
