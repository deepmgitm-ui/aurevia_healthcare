import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-urbanist">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-xl font-bold text-[#147D86] mb-3 font-urbanist">1. Commitment to Privacy</h2>
              <p>
                At <strong>Aurevia Health Care</strong>, your privacy is our utmost priority. We are committed to protecting 
                your personal and medical information. This policy outlines how we collect, use, and safeguard your data 
                when you use our website and services to seek medical guidance and treatment options.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">2. Information We Collect</h2>
              <p className="mb-4">We collect information to provide better services to all our users. This includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, phone number, email address, and location.</li>
                <li><strong>Medical Information:</strong> Symptoms, previous reports, and treatment preferences (only if explicitly shared by you).</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and device information to improve website performance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">3. How We Use Your Information</h2>
              <p>We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>To connect you with relevant medical specialists and hospitals.</li>
                <li>To schedule appointments and facilitate consultations.</li>
                <li>To communicate with you regarding your treatment journey and updates.</li>
                <li>To improve our website functionality and user experience.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">4. Data Security</h2>
              <p>
                We implement strict security measures to protect your data from unauthorized access, alteration, or disclosure. 
                Your medical data is handled with strict confidentiality and is only shared with healthcare providers relevant 
                to your treatment with your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">5. Third-Party Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties. 
                This does not include trusted third parties (like partner hospitals and doctors) who assist us in operating 
                our services, so long as those parties agree to keep this information confidential.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">6. Your Consent</h2>
              <p>
                By using our site, you consent to our online privacy policy. If we decide to change our privacy policy, 
                we will post those changes on this page.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-bold text-gray-900 font-urbanist">Contact Us</h3>
              <p className="mt-2">
                If there are any questions regarding this privacy policy, you may contact us at <a href="mailto:info@aureviahealthcare.com" className="text-[#147D86] hover:underline">info@aureviahealthcare.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
