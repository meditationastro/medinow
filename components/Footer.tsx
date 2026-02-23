import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* CTA SECTION */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center mb-14">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to Join a Meditation Workshop or Retreat?
          </h2>
          <p className="text-slate-400 mb-6">
            Learn effortless meditation, reset your nervous system,
            and deepen your inner clarity.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/9779841647283"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-xl transition"
            >
              💬 WhatsApp
            </a>

            <a
              href="mailto:meditationastro1@gmail.com"
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition border border-slate-600"
            >
              ✉️ Email
            </a>

            <a
              href="tel:+9779841647283"
              className="border border-slate-600 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              📞 Call
            </a>
          </div>
        </div>

        {/* 6 BOX GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Box 1 */}
          <div>
            <h4 className="text-white font-semibold mb-3">About AnswerForSelf</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Meditation workshops and retreats designed to reduce stress,
              improve clarity, and build a sustainable daily practice.
            </p>
          </div>

          {/* Box 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3">Programs</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>Vedic Meditation Workshop (4 Sessions)</li>
              <li>Weekend Meditation Retreat</li>
              <li>Private Meditation Coaching</li>
              <li>Group Meditation Events</li>
            </ul>
          </div>

          {/* Box 3 */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Kathmandu, Nepal (Online Available)<br />
              WhatsApp:{" "}
              <a
                href="https://wa.me/9779841647283"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition"
              >
                +977 9841647283
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:meditationastro1@gmail.com"
                className="text-sky-400 hover:text-white transition"
              >
                meditationastro1@gmail.com
              </a>
            </p>
          </div>

          {/* Box 4 */}
          <div>
            <h4 className="text-white font-semibold mb-3">Workshop Format</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Structured 4-session course<br />
              20 minutes, twice daily practice<br />
              Retreats: 2–7 days (seasonal)<br />
              Small groups for personal guidance
            </p>
          </div>

          {/* Box 5 */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><Link href="/workshop" className="hover:text-white transition">Meditation Workshop</Link></li>
              <li><Link href="/retreats" className="hover:text-white transition">Retreats</Link></li>
              <li><Link href="/book" className="hover:text-white transition">Book / Register</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Box 6 */}
          <div>
            <h4 className="text-white font-semibold mb-3">Important Notice</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Meditation supports wellbeing and clarity but is not a substitute
              for medical or mental health care. Please consult qualified professionals
              for serious concerns.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between text-slate-500 text-sm">
          <div>© {year} answerforself.com • All Rights Reserved</div>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
