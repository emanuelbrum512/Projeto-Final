import { Link } from "react-router-dom";

function CardItem({ item }) {
  return (
    <Link to={`/produto/${item.id}`} className="cartao link-cartao">
      <img
        src={item.imagem ? item.imagem : "https://via.placeholder.com/210x295"}
        alt={item.nome}
      />
      <h2>{item.nome}</h2>
      <span className="preco">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(item.preco)}
      </span>
    </Link>
  );
}

export default CardItem;
