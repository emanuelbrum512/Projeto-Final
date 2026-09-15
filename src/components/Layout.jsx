import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-container">
      <header className="menu-navegacao">
        <span className="logo">Empório Geek</span>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
        </nav>
      </header>

      <main className="conteudo-principal">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
