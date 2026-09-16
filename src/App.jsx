import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
export default function App() {
  const [dados, setDados] = useState({ categorias: [], produtos: [] });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch("/api.json");

        if (!resposta.ok) {
          throw new Error(`Erro ao carregar: ${resposta.status}`);
        }

        const resultado = await resposta.json();
        setDados(resultado);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  if (carregando) return <div className="mensagem">Carregando catálogo...</div>;
  if (erro) return <div className="mensagem erro">Erro: {erro}</div>;

  return (
    <div className="container">
      <Header />
      <h1>Catálogo Geek (TCC)</h1>

      {}
      <div className="categorias-container">
        {dados.categorias.map((categoria) => (
          <button key={categoria.id} className="btn-categoria">
            {categoria.nome}
          </button>
        ))}
      </div>

      {}
      <div className="produtos-grid">
        {dados.produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="produto-imagem"
            />
            <h3 className="produto-nome">{produto.nome}</h3>
            <p className="produto-descricao">{produto.descricao}</p>

            <div className="produto-footer">
              <span className="produto-preco">
                R$ {produto.preco.toFixed(2)}
              </span>
              <span className="produto-avaliacao">⭐ {produto.avaliacao}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
