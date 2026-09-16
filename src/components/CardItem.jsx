import { Link } from "react-router-dom";

function CardItem({ item }) {
  return (
    <Link to={`/produto/${item.id}`} className="produto-card link-card">
      <img
        className="produto-imagem"
        src={item.imagem ? item.imagem : "https://via.placeholder.com/210x295"}
        alt={item.nome}
      />
      <h3 className="produto-nome">{item.nome}</h3>
      <span className="produto-preco">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(item.preco)}
      </span>
    </Link>
  );
}

export default CardItem;
