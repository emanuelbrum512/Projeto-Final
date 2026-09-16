import { useState, useEffect } from "react";
import CardItem from "../components/CardItem.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Loading from "../components/Loading.jsx";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(true);
    fetch(`https://sua-api.com/dados?page=${pagina}`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        const produtosTratados = dados.produtos.map(
          ({ estoque, destaque, ...restoDoProduto }) => restoDoProduto,
        );

        setProdutos(produtosTratados);
        setCategorias(dados.categorias);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao carregar dados:", erro);
        setCarregando(false);
      });
  }, [pagina]);

  const produtosFiltrados = produtos.filter((item) => {
    const bateNome = item.nome.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria =
      categoria === "" || item.categoriaId === Number(categoria);
    return bateNome && bateCategoria;
  });

  const mudarPagina = (numero) => {
    setPagina(numero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagina-home">
      <h1 className="titulo-pagina">Catálogo de Produtos</h1>

      <SearchBar
        busca={busca}
        setBusca={setBusca}
        categoria={categoria}
        setCategoria={setCategoria}
      />

      <nav className="paginacao">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`botao-pagina ${pagina === num ? "ativo" : ""}`}
            onClick={() => mudarPagina(num)}
          >
            Página {num}
          </button>
        ))}
      </nav>

      {carregando ? (
        <Loading mensagem="Buscando os melhores produtos..." />
      ) : (
        <section className="grid-filmes">
          {produtosFiltrados.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
          {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
        </section>
      )}
    </div>
  );
}

export default Home;
