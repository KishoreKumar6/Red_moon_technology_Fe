export default function AdminPageShell({ title, subtitle, children, actions }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin Workspace</p>
          <h2 className="mt-2 text-3xl font-black text-white">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
