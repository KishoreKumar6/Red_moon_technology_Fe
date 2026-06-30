import { useEffect, useState } from 'react';
import AdminPageShell from '../../components/admin/AdminPageShell';
import StatCard from '../../components/admin/StatCard';
import { getEnquiries } from '../../services/enquiryApi';
import { getAdminServices } from '../../services/serviceApi';
import { getAdminPortfolio } from '../../services/portfolioApi';
import { getAdminTestimonials } from '../../services/testimonialApi';

export default function Dashboard() {
  const [stats, setStats] = useState({ enquiries: 0, services: 0, portfolio: 0, testimonials: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [e, s, p, t] = await Promise.all([
        getEnquiries(),
        getAdminServices(),
        getAdminPortfolio(),
        getAdminTestimonials(),
      ]);
      setStats({
        enquiries: e.data.length,
        services: s.data.length,
        portfolio: p.data.length,
        testimonials: t.data.length,
        recent: e.data.slice(0, 5),
      });
      setLoading(false);
    })();
  }, []);

  return (
    <AdminPageShell
      title="Dashboard"
      subtitle="A quick snapshot of the business pipeline and content inventory."
      actions={<div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Backend connected</div>}
    >
      <div className="grid gap-5 md:grid-cols-4">
        <StatCard label="Enquiries" value={loading ? '...' : stats.enquiries} />
        <StatCard label="Services" value={loading ? '...' : stats.services} />
        <StatCard label="Portfolio" value={loading ? '...' : stats.portfolio} />
        <StatCard label="Testimonials" value={loading ? '...' : stats.testimonials} />
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6">
        <h2 className="text-xl font-bold text-white">Recent Enquiries</h2>
        <div className="mt-4 grid gap-3">
          {stats.recent.map((e) => (
            <div key={e._id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <b className="text-white">{e.fullName}</b>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {e.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {e.serviceRequired} · {e.budgetRange}
              </p>
            </div>
          ))}
          {!loading && stats.recent.length === 0 ? (
            <p className="text-sm text-slate-400">No enquiries yet.</p>
          ) : null}
        </div>
      </div>
    </AdminPageShell>
  );
}
