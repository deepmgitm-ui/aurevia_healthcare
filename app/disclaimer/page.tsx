
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Medical disclaimer", description: "Understand the limits of Aurevia Healthcare website information and the role of independent doctors and hospitals in medical decisions.", path: "/disclaimer/" });

export default function DisclaimerPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-container">
          
          <h1 className="legal-title">Medical Disclaimer</h1>
          <p className="legal-updated">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="legal-content">
            
            <div className="legal-highlight legal-highlight--warm">
              <h2 className="legal-h2">⚠️ Not Medical Advice</h2>
              <p>
                The information, including but not limited to, text, graphics, images and other material contained on this website is for informational purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment and before undertaking a new healthcare regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
            </div>

            <div>
              <h2 className="legal-h2">1. Role of Aurevia Healthcare</h2>
              <p>
                Aurevia Healthcare is a healthcare facilitation platform. We coordinate patient journeys by connecting them with independent, highly experienced medical specialists and reputed, accredited hospitals. <strong>We do not practice medicine, prescribe medications, or perform surgeries directly.</strong> The medical care provided is the sole responsibility of the respective clinical team and partner hospital that you choose.
              </p>
            </div>

            <div>
              <h2 className="legal-h2">2. Clinical Decisions and Liability</h2>
              <p>
                Any decisions regarding diagnoses, treatments, prescriptions, surgeries, or other clinical procedures are made solely by independent doctors and clinical professionals in our network, in consultation with you. Aurevia Healthcare does not endorse or recommend any specific tests, physicians, products, procedures, or opinions that may be mentioned on this site. Reliance on any information provided by Aurevia Healthcare, its employees, or others appearing on the website at our invitation is solely at your own risk.
              </p>
            </div>

            <div>
              <h2 className="legal-h2">3. Guarantee of Outcomes</h2>
              <p>
                Aurevia Healthcare coordinates with highly experienced surgeons (typically with 10+ years of average experience) and partner hospitals across its 8 published service regions in India to support high standards of safety and care. However, we cannot and do not guarantee specific medical outcomes or results for any treatment or surgery.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="legal-h3">Questions?</h3>
              <p className="mt-2">
                If you have any questions regarding this Medical Disclaimer, please contact us at <a href="mailto:info@aureviahealthcare.com" className="text-[#147D86] hover:underline">info@aureviahealthcare.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}


