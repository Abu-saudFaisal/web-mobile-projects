import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">BloomLab</Link>
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/calculator">V60 Calculator</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/cafes">Cafe Ratings</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>

      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;