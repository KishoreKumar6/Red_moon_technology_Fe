import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Redmoontechnology1.png";
const links = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Testimonials",
  "Contact",
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-moon/80 backdrop-blur">
      <div className="containerx flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Red Moon Technology home">
          <img
            src={logo}
            alt="Red Moon Technology"
            className="h-12 w-auto object-contain sm:h-16"
          />
        </Link>
        <nav className="hidden gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l}
              to={l === "Home" ? "/" : "/" + l.toLowerCase()}
              className={({ isActive }) =>
                isActive ? "text-redmoon" : "text-slate-300 hover:text-white"
              }
            >
              {l}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn-primary hidden md:flex">
          Get a Quote
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="glass mx-4 mb-4 rounded-2xl p-4 md:hidden">
          {links.map((l) => (
            <Link
              onClick={() => setOpen(false)}
              className="block py-3"
              key={l}
              to={l === "Home" ? "/" : "/" + l.toLowerCase()}
            >
              {l}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
