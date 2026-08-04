import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Premium Header Section */}
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Treatments</span>
          </div>
          <h1>Advanced <em>care.</em></h1>
          <div className="lead">
            <div className="meta">Our Specialties</div>
            <p>Every procedure is performed by senior consultants with ten or more years of experience, at hospitals we know personally. We cover everything from initial consult to cashless discharge.</p>
          </div>
        </div>
      </section>

      {/* Clean List Design (Cards ki jagah sleek rows) */}
      <section className="treat-p" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="treat-list">
            <Link href="/services/lasik" className="treat-row">
              <span className="ix">/ 01</span><span className="nm">LASIK</span>
              <span className="meta">Bladeless laser vision correction · 10–15 min per eye</span>
            </Link>
            <Link href="/services/cataract" className="treat-row">
              <span className="ix">/ 02</span><span className="nm">Cataract surgery</span>
              <span className="meta">Phacoemulsification · IOL placement</span>
            </Link>
            <Link href="/services/sinus" className="treat-row">
              <span className="ix">/ 03</span><span className="nm">Sinus treatment</span>
              <span className="meta">FESS & balloon sinuplasty</span>
            </Link>
            <Link href="/services/rhinoplasty" className="treat-row">
              <span className="ix">/ 04</span><span className="nm">Rhinoplasty</span>
              <span className="meta">Open & closed techniques · cosmetic + functional</span>
            </Link>
            <Link href="/services/kidney-stones" className="treat-row">
              <span className="ix">/ 05</span><span className="nm">Kidney stones</span>
              <span className="meta">ESWL · URS · PCNL</span>
            </Link>
            <Link href="/services/hernia" className="treat-row">
              <span className="ix">/ 06</span><span className="nm">Hernia repair</span>
              <span className="meta">Laparoscopic mesh repair · recurrence below 5%</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}