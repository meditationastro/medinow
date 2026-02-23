export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Awakening the Soul
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Integrating Vedic Astrology, Meditation, and Spiritual Guidance 
            for a fulfilling life. Rooted in Himalayan wisdom. 
            Available in Kathmandu and online worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="https://wa.me/9779841647283"
              className="bg-gradient-to-r from-blue-500 to-emerald-400 text-black font-semibold px-6 py-3 rounded-xl"
            >
              💬 Book on WhatsApp
            </a>

            <a
              href="tel:+9779841647283"
              className="border border-white/30 px-6 py-3 rounded-xl"
            >
              📞 Call Now
            </a>

            <a
              href="mailto:meditationastro1@gmail.com"
              className="border border-white/30 px-6 py-3 rounded-xl"
            >
              ✉️ Email Us
            </a>
          </div>
        </section>

        {/* SERVICES */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Spiritual Guidance</h3>
            <p className="text-gray-400">
              Release mental conditioning and rediscover your true purpose 
              with personalized direction.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">
              Vedic Astrology Consultation
            </h3>
            <p className="text-gray-400">
              Birth chart analysis for career, relationships, timing, and 
              spiritual growth.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">
              Meditation & Yoga
            </h3>
            <p className="text-gray-400">
              Practical meditation and breathwork to build clarity, discipline, 
              and inner peace.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">
            Begin Your Spiritual Journey
          </h2>

          <p className="text-gray-400 mb-8">
            WhatsApp is the fastest way to confirm available slots and fees.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/9779841647283"
              className="bg-gradient-to-r from-blue-500 to-emerald-400 text-black font-semibold px-6 py-3 rounded-xl"
            >
              💬 WhatsApp +977 9841647283
            </a>
            <a
              href="mailto:meditationastro1@gmail.com"
              className="border border-white/30 px-6 py-3 rounded-xl"
            >
              ✉️ meditationastro1@gmail.com
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
