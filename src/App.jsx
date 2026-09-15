import React, { useState, useEffect } from "react";

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

  if (carregando)
    return <div style={{ padding: "20px" }}>Carregando catálogo...</div>;
  if (erro)
    return <div style={{ padding: "20px", color: "red" }}>Erro: {erro}</div>;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Catálogo Geek (TCC)</h1>

      {/* Listando as categorias */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {dados.categorias.map((categoria) => (
          <button
            key={categoria.id}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            {categoria.nome}
          </button>
        ))}
      </div>

      {/* Listando os produtos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {dados.produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px 0" }}>
              {produto.nome}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                height: "40px",
                overflow: "hidden",
              }}
            >
              {produto.descricao}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#27ae60" }}>
                R$ {produto.preco.toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  background: "#f1f2f6",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                ⭐ {produto.avaliacao}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
