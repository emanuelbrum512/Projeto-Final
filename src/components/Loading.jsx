function Loading({ mensagem = "Carregando..." }) {
  return (
    <div className="carregando">
      <p>{mensagem}</p>
    </div>
  );
}

export default Loading;
