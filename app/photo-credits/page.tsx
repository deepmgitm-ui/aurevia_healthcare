import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Photo credits and image sources", description: "Sources and license information for city and illustrative treatment photography used across Aurevia Healthcare pages.", path: "/photo-credits/" });

const photos = [
  ["Chandigarh", "Chetanstr", "Capital Complex Chandigarh", "https://commons.wikimedia.org/wiki/File:Capital_Complex_Chandigarh.jpg", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
  ["Delhi NCR", "Michael Janich", "India Gate", "https://commons.wikimedia.org/wiki/File:India_Gate.jpg", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"],
  ["Ghaziabad", "Biswarup Ganguly", "River Hindon, aerial view", "https://commons.wikimedia.org/wiki/File:River_Hindon_-_Aerial_View_-_Ghaziabad_2016-08-04_5764.JPG", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0/"],
  ["Noida", "SeekeroftheCosmos", "Noida Sector 7X skyline", "https://commons.wikimedia.org/wiki/File:Noida_Sector_7X_Skyline.jpg", "CC0 1.0", "https://creativecommons.org/publicdomain/zero/1.0/"],
  ["Mumbai", "Rutiknatekar", "Bandra–Worli Sea Link", "https://commons.wikimedia.org/wiki/File:Mumbai_Bandra-Worli_Sea_Link.jpg", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Bengaluru", "Augustus Binu", "Vidhana Soudha", "https://commons.wikimedia.org/wiki/File:Vidhana_Soudha_DS.jpg", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"],
  ["Pune", "Subhodeep Mukherjee", "Shaniwar Wada", "https://commons.wikimedia.org/wiki/File:Shaniwar_Wada_Front_View-Pune-Maharashtra-N-MH-M64.jpg", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Telangana", "PaviKukku", "Charminar, Hyderabad", "https://commons.wikimedia.org/wiki/File:Hyderabad_-_Charminar.jpg", "CC0 1.0", "https://creativecommons.org/publicdomain/zero/1.0/"],
  ["Ahmedabad", "Hardik jadeja", "Sabarmati Riverfront", "https://commons.wikimedia.org/wiki/File:Sabarmati_Riverfront.jpg", "Public domain", "https://commons.wikimedia.org/wiki/Commons:Licensing"],
  ["Cataract care", "Fernando Capetillo", "Man undergoing an eye examination with a slit lamp", "https://www.pexels.com/photo/man-undergoing-eye-examination-with-slit-lamp-33857839/", "Pexels License", "https://www.pexels.com/license/"],
  ["LASIK", "Antoni Shkraba", "A man during an eye examination", "https://www.pexels.com/photo/a-man-during-eye-examination-6749700/", "Pexels License", "https://www.pexels.com/license/"],
  ["Sinus care", "Antoni Shkraba", "Woman consulting a doctor", "https://www.pexels.com/photo/woman-consulting-a-doctor-5215008/", "Pexels License", "https://www.pexels.com/license/"],
  ["Tonsil care", "cottonbro studio", "Doctor examines a patient's throat", "https://www.pexels.com/photo/doctor-examine-patient-throat-7579830/", "Pexels License", "https://www.pexels.com/license/"],
  ["Septoplasty", "SHVETS production", "Doctor doing an examination on a patient", "https://www.pexels.com/photo/doctor-doing-an-examination-on-a-patient-8413184/", "Pexels License", "https://www.pexels.com/license/"],
  ["Eardrum care", "Gustavo Fring", "Doctor and patient during an examination", "https://www.pexels.com/photo/woman-and-doctor-6285381/", "Pexels License", "https://www.pexels.com/license/"],
  ["Rhinoplasty", "fahri tokcan", "Plastic surgeon examines a patient's nose", "https://www.pexels.com/photo/plastic-surgeon-examines-patient-s-nose-in-clinic-30686774/", "Pexels License", "https://www.pexels.com/license/"],
  ["Gynecomastia care", "Los Muertos Crew", "Doctor and patient in an examination room", "https://www.pexels.com/photo/doctor-and-patient-sitting-in-an-examination-room-8460083/", "Pexels License", "https://www.pexels.com/license/"],
  ["Kidney stone care", "RDNE Stock project", "Doctors discuss a patient's treatment", "https://www.pexels.com/photo/doctor-talking-to-a-patient-6129681/", "Pexels License", "https://www.pexels.com/license/"],
  ["Dental care", "Pavel Danilyuk", "Dentist and assistant treating a patient", "https://www.pexels.com/photo/man-at-a-dentists-appointment-6812523/", "Pexels License", "https://www.pexels.com/license/"],
  ["Liposuction", "Pavel Danilyuk", "Medical team performs an operation", "https://www.pexels.com/photo/doctor-performing-an-operation-on-patient-7108253/", "Pexels License", "https://www.pexels.com/license/"],
  ["Lipoma care", "Pavel Danilyuk", "Patient at a doctor's office", "https://www.pexels.com/photo/patient-at-doctors-office-7108335/", "Pexels License", "https://www.pexels.com/license/"],
  ["Orthopedic care", "Ana Master", "Doctors treat a patient's leg", "https://www.pexels.com/photo/doctors-treating-leg-of-patient-15149596/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR cataract care", "Fernando Capetillo", "A patient has a slit-lamp eye exam", "https://www.pexels.com/photo/man-undergoing-eye-examination-with-slit-lamp-33857839/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR LASIK", "Ksenia Chernaya", "Woman testing vision with an ophthalmic microscope", "https://www.pexels.com/photo/woman-testing-vision-on-microscope-5752281/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR sinus care", "cottonbro studio", "Doctor checks a patient's throat", "https://www.pexels.com/photo/doctor-examine-patient-throat-7579830/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR tonsil care", "cottonbro studio", "Throat examination in a clinic", "https://www.pexels.com/photo/a-girl-in-pink-crew-neck-shirt-opening-her-mouth-5867732/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR septoplasty", "fahri tokcan", "Nose examination with a plastic surgeon", "https://www.pexels.com/photo/plastic-surgeon-examines-patient-s-nose-in-clinic-30686774/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR eardrum care", "RDNE Stock project", "Clinical examination of a seated patient", "https://www.pexels.com/photo/patient-sitting-during-examination-8313188/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR rhinoplasty", "Antoni Shkraba", "Patient speaks with a doctor", "https://www.pexels.com/photo/woman-consulting-a-doctor-5215008/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR gynecomastia care", "Pavel Danilyuk", "Doctor examines a patient", "https://www.pexels.com/photo/patient-at-doctors-office-7108335/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR kidney stone care", "RDNE Stock project", "Doctors discuss a patient's treatment", "https://www.pexels.com/photo/doctor-talking-to-a-patient-6129681/", "Pexels License", "https://www.pexels.com/license/"],
  ["Delhi NCR dental care", "iam luisao", "Dentist checks a patient's teeth", "https://www.pexels.com/photo/a-dentist-checking-her-patient-12917364/", "Pexels License", "https://www.pexels.com/license/"],
] as const;

export default function PhotoCreditsPage() {
  return (
    <main className="legal-page photo-credits-page">
      <section className="legal-hero">
      <div className="legal-container">
        <p className="interior-eyebrow"><span /> Aurevia Healthcare · Visual library</p>
        <h1 className="legal-title">Photo credits</h1>
        <p className="legal-intro">City photographs and treatment stock images are credited to their creators below. Treatment photos are illustrative stock imagery; they do not depict Aurevia patients, facilities or outcomes, and do not imply endorsement.</p>
        <div className="photo-credit-list">
          {photos.map(([city, author, subject, source, license, licenseUrl]) => (
            <section key={city} className="photo-credit-row">
              <h2>{city}</h2>
              <p>
                “{subject}” by {author}. <a href={source} target="_blank" rel="noreferrer">Source</a> · <a href={licenseUrl} target="_blank" rel="noreferrer">{license}</a>. Photo displayed as supplied.
              </p>
            </section>
          ))}
        </div>
      </div>
      </section>
    </main>
  );
}
