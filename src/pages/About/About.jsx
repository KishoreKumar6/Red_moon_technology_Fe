import SectionTitle from '../../components/common/SectionTitle';
import { services } from '../../data/dummyData';

const highlights = [
  'Website development for business growth',
  'Mobile app development for Android and iOS',
  'SEO and digital marketing for better reach',
  'Creative branding and premium UI/UX design',
  'Business automation and admin-friendly systems',
  'E-commerce solutions with modern management tools',
];

const aboutStats = [
  { value: '01', label: 'Focused team delivering modern digital products' },
  { value: '02', label: 'Strategy-led design that supports leads and conversions' },
  { value: '03', label: 'Built with scalable MERN stack and responsive UI' },
];

export default function About() {
  const marqueeItems = [...services, ...services];

  return (
    <main className="section pt-28 sm:pt-32">
      <div className="containerx space-y-14">
        <SectionTitle
          eyebrow="About"
          title="Red Moon Technology builds premium digital systems for growing businesses"
          desc="We help brands look stronger online with modern websites, mobile apps, SEO, digital marketing, branding, and automation solutions that are designed to perform on every screen."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl font-black sm:text-3xl">Who we are</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Red Moon Technology is a digital solutions company focused on helping businesses
              build a strong online identity. We combine modern design, clean development, and
              practical strategy to create websites and applications that feel premium, load fast,
              and work smoothly across mobile, tablet, and desktop devices.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Our work is built around three goals: make your brand look professional, make your
              services easier to discover, and make it easier for your customers to contact you,
              enquire, and buy. That is why we focus on responsive layouts, conversion-friendly
              content, and scalable code.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div key={stat.value} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-2xl font-black text-redmoon">{stat.value}</div>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl font-black sm:text-3xl">What we build</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300 sm:text-base">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="mt-0.5 text-redmoon">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="glass rounded-[2rem] p-6 sm:p-8">
          <SectionTitle
            eyebrow="Services"
            title="Our core services"
            desc="Here is a quick look at the services we offer to help brands grow online."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5 sm:p-6">
                  <div className="text-3xl">{service.icon}</div>
                  <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-1 text-sm text-slate-300">
                    {service.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle
            eyebrow="Running Content"
            title="Left to right service scroll"
            desc="A moving strip that highlights our main offerings and keeps the page feeling dynamic."
          />
          <div className="marquee rounded-[2rem] border border-white/10 bg-white/[0.03] py-4">
            <div className="marquee-track reverse pl-4">
              {marqueeItems.map((service, index) => (
                <div
                  key={`${service.title}-${index}`}
                  className="marquee-item rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm text-slate-200"
                >
                  {service.icon} {service.title}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <h3 className="text-2xl font-black sm:text-3xl">Why clients choose Red Moon Technology</h3>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
            Clients work with us because we focus on clarity, speed, and quality. We do not just
            design pages, we build digital experiences that support sales, enquiries, credibility,
            and long-term business growth. Every project is handled with a strong mix of design,
            development, and marketing thinking.
          </p>
        </div>
      </div>
    </main>
  );
}
