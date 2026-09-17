function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Empório Geek</h3>
          <p>
            O seu destino definitivo para colecionáveis, games e cultura pop.
          </p>
        </div>

        <div className="footer-section">
          <h4>Navegação</h4>
          <ul>
            <li>
              <a href="/">Início</a>
            </li>

            <li>
              <a href="/sobre">Sobre Nós</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Empório Geek. Todos os direitos
          reservados.
        </p>
        <p className="footer-authors">
          Desenvolvido por Emanuel Henrique de Almeida Brum &amp; Fernando
          Foeppel Torres Spinelli Pardal.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
