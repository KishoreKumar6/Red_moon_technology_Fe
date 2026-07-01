import { Link } from "react-router-dom";
const logo = new URL("../../assets/RedMoonTechnology1.png", import.meta.url).href;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-white/10 bg-black/40 py-10"
      onClick={scrollToTop}
    >
      <div className="containerx grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link
            to="/"
            className="inline-flex items-center"
            aria-label="Red Moon Technology home"
          >
            <img
              src={logo}
              alt="Red Moon Technology"
              className="h-16 w-auto animate-bounce object-contain sm:h-20"
            />
          </Link>
          <p className="mt-3 text-slate-400">
            Premium IT services, websites, apps, SEO and digital marketing.
          </p>
        </div>
        <div>
          <h4 className="font-bold">Quick Links</h4>
          <div className="mt-3 grid gap-2 text-slate-400">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Contact</h4>
          <p className="mt-3 text-slate-400">
            Email: redmoontechnologyofficial@gmail.com
            <br />
            Phone: +91 962 962 1359
            <br />
            Location: Red Moon Technology, MBT Road, Navalpure, Ranipet - 632401
          </p>
        </div>
      </div>
      <p className="containerx mt-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Red Moon Technology. All rights reserved.
      </p>
    </footer>
  );
}
