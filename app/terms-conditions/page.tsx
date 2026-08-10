import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsConditionsPage() {
  return (
    <main>
      <Navbar />
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-urbanist">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h2 className="text-xl font-bold text-red-600 mb-3 font-urbanist">⚠️ Important Medical Disclaimer</h2>
              <p>
                Aurevia Health Care is a facilitator and guidance platform, not a direct medical service provider. 
                The content on this website is for informational purposes only and is <strong>not a substitute for professional medical advice, 
                diagnosis, or treatment.</strong> Always seek the advice of your physician or qualified health provider with any questions 
                you may have regarding a medical condition.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the <strong>Aurevia Health Care</strong> website, you accept and agree to be bound by the terms 
                and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted 
                guidelines or rules applicable to such services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">2. Use of Services</h2>
              <p>
                Our services are intended to assist you in finding appropriate medical care. You agree to provide accurate, current, 
                and complete information during the consultation process. Aurevia Health Care reserves the right to refuse service 
                or terminate accounts if information provided is found to be false or misleading.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">3. Limitation of Liability</h2>
              <p>
                Aurevia Health Care connects patients with independent medical professionals and hospitals. We are not liable for 
                any medical negligence, malpractice, or outcomes of treatments provided by third-party doctors or hospitals. 
                The final decision regarding any medical procedure lies solely with the patient.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">4. Intellectual Property</h2>
              <p>
                All content included on this site, such as text, graphics, logos, images, and software, is the property of 
                Aurevia Health Care or its content suppliers and protected by international copyright laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">5. Booking and Cancellations</h2>
              <p>
                Appointment bookings facilitated through our platform are subject to the availability of the doctor/hospital. 
                Cancellation policies may vary depending on the specific hospital or clinic chosen for the treatment.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">6. Governing Law</h2>
              <p>
                Any disputes arising out of or related to these Terms and Conditions and/or any use by you of the Site shall be 
                governed by the laws of India, without regard to the conflicts of laws provisions therein.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-bold text-gray-900 font-urbanist">Questions?</h3>
              <p className="mt-2">
                Please contact us at <a href="mailto:info@aureviahealthcare.com" className="text-[#147D86] hover:underline">info@aureviahealthcare.com</a> for any queries related to these terms.
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
