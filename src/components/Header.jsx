function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logotipo ou Nome da Marca */}
        <div className="header-logo">
          <a href="/">Empório Geek</a>
        </div>

        <nav className="header-nav">
          <ul>
            <li>
              <a href="/">Início</a>
            </li>
            <li>
              <a href="/sobre">Sobre Nós</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="cart-btn" aria-label="Carrinho de Compras">
            🛒 <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
