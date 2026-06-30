import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminPageShell from '../../components/admin/AdminPageShell';
import { createPortfolio, deletePortfolio, getAdminPortfolio, updatePortfolio } from '../../services/portfolioApi';

const empty = { title: '', category: '', description: '', image: '', projectUrl: '', technologies: '', active: true };

const parseTechnologies = (value) =>
  String(value)
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

export default function PortfolioManage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getAdminPortfolio();
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const data = { ...form, technologies: parseTechnologies(form.technologies) };
    edit ? await updatePortfolio(edit, data) : await createPortfolio(data);
    toast.success('Portfolio saved');
    setForm(empty);
    setEdit(null);
    load();
  };

  return (
    <AdminPageShell
      title="Portfolio"
      subtitle="Showcase completed work with clean project cards and live links."
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <h3 className="text-xl font-black text-white">{edit ? 'Edit Project' : 'Add Project'}</h3>
          {['title', 'category', 'description', 'image', 'projectUrl', 'technologies'].map((k) => (
            <input
              key={k}
              className="input mt-3"
              placeholder={k}
              value={form[k] || ''}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <label className="mt-4 flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Active on website
          </label>
          <button className="btn btn-primary mt-5 w-full">{edit ? 'Update' : 'Save'}</button>
        </form>

        <div className="xl:col-span-2">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl bg-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((i) => (
                <article key={i._id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-redmoon">{i.category}</p>
                      <h4 className="mt-2 text-lg font-bold text-white">{i.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{i.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {i.active ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">
                    <span className="text-slate-500">Tech:</span> {i.technologies?.join(', ')}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                      onClick={() => {
                        setEdit(i._id);
                        setForm({ ...i, technologies: i.technologies?.join(', ') });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-100 transition hover:bg-red-500/20"
                      onClick={async () => {
                        await deletePortfolio(i._id);
                        load();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}
