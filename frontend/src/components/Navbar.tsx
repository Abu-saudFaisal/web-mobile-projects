import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-lg transition-all duration-200
    ${
      isActive
        ? "text-[#D5A373] border-b-2 border-[#D5A373]"
        : "hover:bg-[#2A1D15]"
    }`;

  return (
    <nav className="bg-[#1A120B] text-white border-b border-[#3C2A21]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#D5A373] tracking-wide"
        >
          BloomLab
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-4">
          <li>
            <NavLink to="/" end className={navLinkStyle}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/calculator" className={navLinkStyle}>
              V60 Calculator
            </NavLink>
          </li>


          <li>
            <NavLink to="/cafes" className={navLinkStyle}>
              Cafes List
            </NavLink>
          </li>

          <li>
            <NavLink to="/reviews" className={navLinkStyle}>
              Reviews
            </NavLink>
          </li>
        </ul>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-white/80">
                Hello,{" "}
                <span className="font-semibold text-[#D5A373]">
                  {user.username}
                </span>
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-[#D5A373] rounded-lg transition-all duration-200 hover:bg-[#D5A373] hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 border border-[#D5A373] rounded-lg transition-all duration-200
                  hover:bg-[#D5A373] hover:text-black
                  ${isActive ? "bg-[#D5A373] text-black" : ""}`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 bg-[#D5A373] text-black rounded-lg transition-all duration-200
                  hover:bg-[#C28F60]
                  ${isActive ? "ring-2 ring-white/30" : ""}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;