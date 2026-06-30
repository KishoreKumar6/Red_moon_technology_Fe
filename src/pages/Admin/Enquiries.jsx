import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminPageShell from '../../components/admin/AdminPageShell';
import { deleteEnquiry, getEnquiries, updateEnquiryStatus } from '../../services/enquiryApi';

const statusStyles = {
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  contacted: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
  closed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
};

export default function Enquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setError('');
      const res = await getEnquiries();
      setItems(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await deleteEnquiry(id);
    toast.success('Enquiry deleted');
    load();
  };

  const status = async (id, nextStatus) => {
    await updateEnquiryStatus(id, nextStatus);
    toast.success('Status updated');
    load();
  };

  return (
    <AdminPageShell
      title="Enquiries"
      subtitle="Track incoming leads, update status, and keep the sales pipeline moving."
    >
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">
          No enquiries yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((e) => (
            <article
              key={e._id}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 shadow-lg shadow-black/10"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{e.fullName}</h3>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                        statusStyles[e.status] || 'border-white/10 bg-white/5 text-slate-200'
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {e.email} · {e.phone}
                  </p>
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-500">Service:</span> {e.serviceRequired}
                  </p>
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-500">Budget:</span> {e.budgetRange}
                  </p>
                  <p className="max-w-3xl rounded-2xl bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                    {e.message}
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  <select
                    className="input h-12 min-w-44"
                    value={e.status}
                    onChange={(x) => status(e._id, x.target.value)}
                  >
                    <option className="text-black">pending</option>
                    <option className="text-black">contacted</option>
                    <option className="text-black">closed</option>
                  </select>
                  <button
                    onClick={() => del(e._id)}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminPageShell>
  );
}
