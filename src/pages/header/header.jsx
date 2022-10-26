import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header>
        <h1>HEADER SISTEMA</h1>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/private">Private</Link>
        </nav>
      </header>
      )
}