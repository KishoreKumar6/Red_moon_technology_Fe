import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminPageShell from '../../components/admin/AdminPageShell';
import { createService, deleteService, getAdminServices, updateService } from '../../services/serviceApi';

const empty = { title: '', description: '', features: '', icon: '⚡', image: '', active: true };

function parseFeatures(value) {
  return String(value)
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function ServicesManage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getAdminServices();
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
    const data = { ...form, features: parseFeatures(form.features) };
    edit ? await updateService(edit, data) : await createService(data);
    toast.success('Service saved');
    setForm(empty);
    setEdit(null);
    load();
  };

  return (
    <AdminPageShell
      title="Services"
      subtitle="Create and maintain the services that show on the public website."
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <h3 className="text-xl font-black text-white">{edit ? 'Edit Service' : 'Add Service'}</h3>
          {['title', 'description', 'features', 'icon', 'image'].map((k) => (
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
                      <p className="text-sm uppercase tracking-[0.2em] text-redmoon">{i.icon || '•'}</p>
                      <h4 className="mt-2 text-lg font-bold text-white">{i.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{i.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {i.active ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                      onClick={() => {
                        setEdit(i._id);
                        setForm({ ...i, features: i.features?.join(', ') });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-100 transition hover:bg-red-500/20"
                      onClick={async () => {
                        await deleteService(i._id);
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
