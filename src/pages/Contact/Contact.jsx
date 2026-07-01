import { useState } from "react";
import toast from "react-hot-toast";
import SectionTitle from "../../components/common/SectionTitle";
import { submitEnquiry } from "../../services/enquiryApi";
import { services } from "../../data/dummyData";
export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceRequired: "",
    budgetRange: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitEnquiry(form);
      toast.success(res.data?.emailSent ? "Enquiry submitted and email sent" : res.data?.emailNote || "Enquiry submitted, but email may not have been sent");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        serviceRequired: "",
        budgetRange: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Please check all fields");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="section pt-28 sm:pt-32">
      <div className="containerx">
        <SectionTitle
          eyebrow="Contact"
          title="Tell us about your project"
          desc="Submit your enquiry and our team will contact you."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={submit}
            className="glass grid gap-4 rounded-[2rem] p-5 sm:p-6"
          >
            <input
              className="input"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={change}
              required
            />
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={change}
              required
            />
            <input
              className="input"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={change}
              required
            />
            <select
              className="input"
              name="serviceRequired"
              value={form.serviceRequired}
              onChange={change}
              required
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option className="text-black" key={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            <select
              className="input"
              name="budgetRange"
              value={form.budgetRange}
              onChange={change}
            >
              <option value="">Budget Range</option>
              {[
                "Below ₹25,000",
                "₹25,000 - ₹50,000",
                "₹50,000 - ₹1,00,000",
                "Above ₹1,00,000",
              ].map((b) => (
                <option className="text-black" key={b}>
                  {b}
                </option>
              ))}
            </select>
            <textarea
              className="input min-h-36"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={change}
              required
            />
            <button
              className="btn btn-primary w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
          <div className="glass rounded-[2rem] p-5 sm:p-8">
            <h3 className="text-2xl font-black">Contact Details</h3>
            <p className="mt-5 text-sm text-slate-300 sm:text-base">
              Email: redmoontechnologyofficial@gmail.com
            </p>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Phone: +91 962 962 1359
            </p>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Location: Red Moon Technology, MBT Road, Navalpure, Ranipet -
              632401
            </p>
            <p className="mt-8 text-sm text-slate-400 sm:text-base">
              We usually help with website development, app development, digital marketing, SEO,
              social media marketing, branding and automation solutions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
