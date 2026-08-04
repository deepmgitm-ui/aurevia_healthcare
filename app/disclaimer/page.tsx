import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <main>
      <Navbar />
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-urbanist">Medical Disclaimer</h1>
          <p className="text-gray-500 text-sm mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h2 className="text-xl font-bold text-red-600 mb-3 font-urbanist">⚠️ Not Medical Advice</h2>
              <p>
                The information, including but not limited to, text, graphics, images and other material contained on this website is for informational purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment and before undertaking a new healthcare regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">1. Role of Aurevia Healthcare</h2>
              <p>
                Aurevia Healthcare is a healthcare facilitation platform. We coordinate patient journeys by connecting them with independent, highly experienced medical specialists and reputed, accredited hospitals. <strong>We do not practice medicine, prescribe medications, or perform surgeries directly.</strong> The medical care provided is the sole responsibility of the respective clinical team and partner hospital that you choose.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">2. Clinical Decisions and Liability</h2>
              <p>
                Any decisions regarding diagnoses, treatments, prescriptions, surgeries, or other clinical procedures are made solely by independent doctors and clinical professionals in our network, in consultation with you. Aurevia Healthcare does not endorse or recommend any specific tests, physicians, products, procedures, or opinions that may be mentioned on this site. Reliance on any information provided by Aurevia Healthcare, its employees, or others appearing on the website at our invitation is solely at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">3. Guarantee of Outcomes</h2>
              <p>
                Aurevia Healthcare coordinates with highly experienced surgeons (typically with 10+ years of average experience) and partner hospitals in Delhi NCR and Mumbai to ensure the highest standards of safety and care. However, we cannot and do not guarantee specific medical outcomes or results for any treatment or surgery.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-bold text-gray-900 font-urbanist">Questions?</h3>
              <p className="mt-2">
                If you have any questions regarding this Medical Disclaimer, please contact us at <a href="mailto:info@aureviahealthcare.com" className="text-[#4FA6D8] hover:underline">info@aureviahealthcare.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
