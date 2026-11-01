
export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-container">
          
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="legal-content">
            
            <div className="legal-highlight legal-highlight--cool">
              <h2 className="legal-h2">1. Commitment to Privacy</h2>
              <p>
                At <strong>Aurevia Health Care</strong>, your privacy is our utmost priority. We are committed to protecting 
                your personal and medical information. This policy outlines how we collect, use, and safeguard your data 
                when you use our website and services to seek medical guidance and treatment options.
              </p>
            </div>

            <div>
              <h2 className="legal-h2">2. Information We Collect</h2>
              <p className="mb-4">We collect information to provide better services to all our users. This includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, phone number, email address, and location.</li>
                <li><strong>Medical Information:</strong> Symptoms, previous reports, and treatment preferences (only if explicitly shared by you).</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and device information to improve website performance.</li>
              </ul>
            </div>

            <div>
              <h2 className="legal-h2">3. How We Use Your Information</h2>
              <p>We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>To connect you with relevant medical specialists and hospitals.</li>
                <li>To schedule appointments and facilitate consultations.</li>
                <li>To communicate with you regarding your treatment journey and updates.</li>
                <li>To improve our website functionality and user experience.</li>
              </ul>
            </div>

            <div>
              <h2 className="legal-h2">4. Data Security</h2>
              <p>
                We implement strict security measures to protect your data from unauthorized access, alteration, or disclosure. 
                Your medical data is handled with strict confidentiality and is only shared with healthcare providers relevant 
                to your treatment with your consent.
              </p>
            </div>

            <div>
              <h2 className="legal-h2">5. Third-Party Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties. 
                This does not include trusted third parties (like partner hospitals and doctors) who assist us in operating 
                our services, so long as those parties agree to keep this information confidential.
              </p>
            </div>

            <div>
              <h2 className="legal-h2">6. Your Consent</h2>
              <p>
                By using our site, you consent to our online privacy policy. If we decide to change our privacy policy, 
                we will post those changes on this page.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="legal-h3">Contact Us</h3>
              <p className="mt-2">
                If there are any questions regarding this privacy policy, you may contact us at <a href="mailto:info@aureviahealthcare.com" className="text-[#147D86] hover:underline">info@aureviahealthcare.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}


