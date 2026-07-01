import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
const logo = new URL("../../assets/RedMoonTechnology1.png", import.meta.url).href;
const logo1 = new URL("../../assets/Rmt-removebg.png", import.meta.url).href;

const links = [
  "Home",
  "About",
  // "Services",
  "Portfolio",
  "Testimonials",
  "Contact",
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-moon/80 backdrop-blur"
      onClick={scrollToTop}
    >
      <div className="containerx relative flex h-20 items-center gap-3 pr-16 sm:gap-4 sm:pr-0">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Red Moon Technology home"
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
          }}
        >
          {/* <img
            src={logo}
            alt="Red Moon Technology"
            className="h-16 w-auto hidden sm:block object-contain sm:h-12 md:h-20"
          /> */}
          <img
            src={logo1}
            alt="Red Moon Technology"
            className="h-16 w-auto object-contain sm:h-12 md:h-20"
          />
        </Link>
        <nav className="ml-auto hidden gap-4 lg:flex xl:gap-7" onClick={(e) => e.stopPropagation()}>
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
        <Link
          to="/contact"
          className="hidden rounded-full border border-white/60 bg-redmoon px-2 py-2 text-white transition-all duration-300 hover:scale-105 lg:flex"
          onClick={(e) => e.stopPropagation()}
        >
          Get a Quote
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-redmoon text-white shadow-lg shadow-red-900/40 transition hover:scale-105 hover:bg-red-500 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-nav"
          className="glass mx-4 mb-4 rounded-2xl p-4 md:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid gap-2">
            {links.map((l) => (
              <Link
                onClick={closeMenu}
                className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-slate-200 transition hover:border-white/10 hover:bg-white/10 hover:text-white"
                key={l}
                to={l === "Home" ? "/" : "/" + l.toLowerCase()}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            onClick={closeMenu}
            to="/contact"
            className="btn btn-primary mt-4 w-full "
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
