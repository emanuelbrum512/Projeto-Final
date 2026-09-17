import { Link } from "react-router-dom";

function CardItem({ item, priority = false }) {
  return (
    <Link to={`/produto/${item.id}`} className="produto-card link-card">
      <img
        className="produto-imagem"
        src={item.imagem ? item.imagem : "https://via.placeholder.com/210x295"}
        alt={item.nome}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <h2 className="produto-nome">{item.nome}</h2>
      <div className="produto-footer">
        <span className="produto-preco">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.preco)}
        </span>

        <div className="produto-avaliacao">
          ⭐ {item.avaliacao ? item.avaliacao : "4.8"}
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
