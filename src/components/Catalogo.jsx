import React, { useState, useEffect } from "react";

export function App() {
  const [dados, setDados] = useState({ categorias: [], produtos: [] });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch("/produtos.json");

        if (!resposta.ok) {
          throw new Error("Erro ao carregar o arquivo JSON");
        }

        const resultado = await resposta.json();
        setDados(resultado);
      } catch (erro) {
        console.error("Deu erro:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Meus Produtos Nerds</h1>
      <ul>
        {dados.produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
