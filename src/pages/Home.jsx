import { useState, useEffect } from "react";
import CardItem from "../components/CardItem.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Loading from "../components/Loading.jsx";
import Hero from "../components/Hero.jsx";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagina] = useState(1);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarDadosDaApi() {
      setCarregando(true);
      try {
        const resposta = await fetch("/api.json");
        if (!resposta.ok) {
          throw new Error("Falha ao carregar os dados da API local.");
        }
        const dados = await resposta.json();

        const listaProdutosRaw = Array.isArray(dados)
          ? dados
          : dados.produtos || [];
        const listaCategorias = Array.isArray(dados)
          ? []
          : dados.categorias || [];

        const produtosTratados = listaProdutosRaw.map((item) => ({
          ...item,
          categoriaId: Number(item.categoriaId),
        }));

        setProdutos(produtosTratados);
        setCategorias(listaCategorias);
      } catch (erro) {
        console.error("Erro capturado no try/catch:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosDaApi();
  }, [pagina]);

  const produtosFiltrados = produtos.filter((item) => {
    const bateNome = item.nome
      ? item.nome.toLowerCase().includes(busca.toLowerCase())
      : true;
    const bateCategoria =
      categoria === "" || item.categoriaId === Number(categoria);
    return bateNome && bateCategoria;
  });

  return (
    <div className="pagina-home">
      <Hero />

      <SearchBar
        busca={busca}
        setBusca={setBusca}
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={categorias}
      />

      {carregando ? (
        <Loading mensagem="Buscando os melhores produtos..." />
      ) : (
        <section className="produtos-grid">
          {produtosFiltrados.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
          {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
        </section>
      )}
    </div>
  );
}
