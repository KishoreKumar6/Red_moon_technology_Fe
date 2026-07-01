import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(225,29,72,.35),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,.9),transparent_35%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="containerx relative grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-bold tracking-[.25em] text-redmoon sm:text-base sm:tracking-[.3em]">
            PREMIUM DIGITAL SOLUTIONS
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
            Build Your <span className="gradient-text">Digital Future</span>{" "}
            with Red Moon Technology
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 sm:mt-6 sm:text-lg">
            We create powerful websites, mobile apps, branding, SEO and
            marketing solutions that help businesses grow online.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link className="btn btn-primary w-full sm:w-auto" to="/contact">
              Start Your Project
            </Link>
            <Link className="btn glass w-full sm:w-auto" to="/portfolio">
              View Portfolio
            </Link>
          </div>
        </div>
        <div className="glass rounded-[1.5rem] p-4 shadow-glow sm:rounded-[2rem] sm:p-5">
          <img
            className="h-72 w-full rounded-[1.25rem] object-cover sm:h-[460px] sm:rounded-[1.5rem]"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
            alt="Digital workspace"
          />
        </div>
      </div>
    </section>
  );
}
