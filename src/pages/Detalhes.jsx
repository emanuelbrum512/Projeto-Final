import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";

function Detalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/produtos/${id}`)
      .then((resposta) => resposta.json())
      .then((dados) => setProduto(dados))
      .catch((erro) => console.error("Erro ao carregar detalhes:", erro));
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
            {produto.preco.toFixed(2).replace(".", ",")}
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
