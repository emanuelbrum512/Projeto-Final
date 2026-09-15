function SearchBar({ busca, setBusca, categoria, setCategoria }) {
  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Busque por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="campo-busca"
      />
      <select
        className="campo-busca"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        <option value="1">Anime</option>
        <option value="2">Games</option>
        <option value="3">RPG</option>
        <option value="4">Colecionáveis</option>
        <option value="5">Quadrinhos</option>
        <option value="6">Star Wars</option>
        <option value="7">Fantasia</option>
        <option value="8">Ficção Científica</option>
        <option value="9">Acessórios</option>
        <option value="10">Decoração</option>
      </select>
    </div>
  );
}
export default SearchBar;
