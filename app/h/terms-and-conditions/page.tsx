"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function TermsAndConditions() {
  const lastUpdated = "October 16, 2024"

  const downloadPDF = () => {
    // You'll need to add the actual PDF file and implement the download functionality
    window.open("/terms-and-conditions.pdf", "_blank") 
  }

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Terms & Conditions</h1>
            <p className="text-primary/70 mt-2">Last updated: {lastUpdated}</p>
          </div>
          <Button 
            onClick={downloadPDF}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        <Card className="p-6 md:p-8 space-y-8 bg-white/80 backdrop-blur-sm border-primary/20">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">1. Introduction</h2>
            <p className="text-primary/90">
              These Terms and conditions apply to this website and to the transactions related to our products and services. You may be bound by additional contracts related to your relationship with us or any products or services that you receive from us. If any provisions of the additional contracts conflict with any provisions of these Terms, the provisions of these additional contracts will control and prevail.
            </p>
          </section>

          {/* Binding */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">2. Binding</h2>
            <p className="text-primary/90">
              By registering with, accessing, or otherwise using this website, you hereby agree to be bound by these Terms and conditions set forth below. The mere use of this website implies the knowledge and acceptance of these Terms and conditions. In some particular cases, we can also ask you to explicitly agree.
            </p>
          </section>

          {/* Electronic Communication */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">3. Electronic Communication</h2>
            <p className="text-primary/90">
              By using this website or communicating with us by electronic means, you agree and acknowledge that we may communicate with you electronically on our website or by sending an email to you, and you agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement, including but not limited to the requirement that such communications should be in writing.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">4. Intellectual Property</h2>
            <p className="text-primary/90">
              We or our licensors own and control all of the copyright and other intellectual property rights in the website and the data, information, and other resources displayed by or accessible within the website.
            </p>
            <h3 className="text-xl font-semibold text-primary">4.1 Creative Commons</h3>
            <p className="text-primary/90">
              The content on this website is available under a Creative commons - Attribution License, unless specified otherwise.
            </p>
          </section>

          {/* Third-party Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">5. Third-party Property</h2>
            <p className="text-primary/90">
              Our website may include hyperlinks or other references to other party&apos;s websites. We do not monitor or review the content of other party&apos;s websites which are linked to from this website. Products or services offered by other websites shall be subject to the applicable Terms and Conditions of those third parties. Opinions expressed or material appearing on those websites are not necessarily shared or endorsed by us.
            </p>
            <p className="text-primary/90">
              We will not be responsible for any privacy practices or content of these sites. You bear all risks associated with the use of these websites and any related third-party services. We will not accept any responsibility for any loss or damage in whatever manner, however caused, resulting from your disclosure to third parties of personal information.
            </p>
          </section>

          {/* Responsible Use */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">6. Responsible Use</h2>
            <p className="text-primary/90">
              By visiting our website, you agree to use it only for the purposes intended and as permitted by these Terms, any additional contracts with us, and applicable laws, regulations, and generally accepted online practices and industry guidelines. You must not use our website or services to use, publish or distribute any material which consists of (or is linked to) malicious computer software; use data collected from our website for any direct marketing activity, or conduct any systematic or automated data collection activities on or in relation to our website.
            </p>
            <p className="text-primary/90">
              Engaging in any activity that causes, or may cause, damage to the website or that interferes with the performance, availability, or accessibility of the website is strictly prohibited.
            </p>
          </section>

          {/* Refund and Return Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">7. Refund and Return Policy</h2>
            <h3 className="text-xl font-semibold text-primary">7.1 Right of Withdrawal</h3>
            <p className="text-primary/90">
              You have the right to withdraw from this contract within 30 days without giving any reason. The withdrawal period will expire after 30 days from the day on which you acquire, or a third-party other than the carrier and indicated by you acquires, physical possession of the goods.
            </p>
            <h3 className="text-xl font-semibold text-primary">7.2 Effects of Withdrawal</h3>
            <p className="text-primary/90">
              If you withdraw from this contract, we shall reimburse you all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract.
            </p>
          </section>

          {/* Idea Submission */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">8. Idea Submission</h2>
            <p className="text-primary/90">
              Do not submit any ideas, inventions, works of authorship, or other information that can be considered your own intellectual property that you would like to present to us unless we have first signed an agreement regarding the intellectual property or a non-disclosure agreement. If you disclose it to us absent such written agreement, you grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, store, adapt, publish, translate and distribute your content in any existing or future media.
            </p>
          </section>

          {/* Termination of Use */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">9. Termination of Use</h2>
            <p className="text-primary/90">
              We may, in our sole discretion, at any time modify or discontinue access to, temporarily or permanently, the website or any Service thereon. You agree that we will not be liable to you or any third party for any such modification, suspension or discontinuance of your access to, or use of, the website or any content that you may have shared on the website. You will not be entitled to any compensation or other payment, even if certain features, settings, and/or any Content you have contributed or have come to rely on, are permanently lost. You must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our website.
            </p>
          </section>

          {/* Warranties and Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">10. Warranties and Liability</h2>
            <p className="text-primary/90">
              Nothing in this section will limit or exclude any warranty implied by law that it would be unlawful to limit or to exclude. This website and all content on the website are provided on an &quot;as is&quot; and &quot;as available&quot; basis and may include inaccuracies or typographical errors. We expressly disclaim all warranties of any kind, whether express or implied, as to the availability, accuracy, or completeness of the Content.
            </p>
            <p className="text-primary/90">
              We make no warranty that:
              <br />- this website or our products or services will meet your requirements;
              <br />- this website will be available on an uninterrupted, timely, secure, or error-free basis;
              <br />- the quality of any product or service purchased or obtained by you through this website will meet your expectations.
            </p>
          </section>

          {/* Privacy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">11. Privacy</h2>
            <p className="text-primary/90">
              To access our website and/or services, you may be required to provide certain information about yourself as part of the registration process. You agree that any information you provide will always be accurate, correct, and up to date.
            </p>
            <p className="text-primary/90">
              We take your personal data seriously and are committed to protecting your privacy. We will not use your email address for unsolicited mail. Any emails sent by us to you will only be in connection with the provision of agreed products or services.
            </p>
          </section>

          {/* Export Restrictions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">12. Export Restrictions / Legal Compliance</h2>
            <p className="text-primary/90">
              Access to the website from territories or countries where the Content or purchase of the products or Services sold on the website is illegal is prohibited. You may not use this website in violation of export laws and regulations of Nepal.
            </p>
          </section>

          {/* Assignment */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">13. Assignment</h2>
            <p className="text-primary/90">
              You may not assign, transfer or sub-contract any of your rights and/or obligations under these Terms and conditions, in whole or in part, to any third party without our prior written consent. Any purported assignment in violation of this Section will be null and void.
            </p>
          </section>

          {/* Breaches */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">14. Breaches of These Terms and Conditions</h2>
            <p className="text-primary/90">
              Without prejudice to our other rights under these Terms and Conditions, if you breach these Terms and Conditions in any way, we may take such action as we deem appropriate to deal with the breach, including temporarily or permanently suspending your access to the website, contacting your internet service provider to request that they block your access to the website, and/or commence legal action against you.
            </p>
          </section>

          {/* Force Majeure */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">15. Force Majeure</h2>
            <p className="text-primary/90">
              Except for obligations to pay money hereunder, no delay, failure or omission by either party to carry out or observe any of its obligations hereunder will be deemed to be a breach of these Terms and conditions if and for as long as such delay, failure or omission arises from any cause beyond the reasonable control of that party.
            </p>
          </section>

          {/* Indemnification */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">16. Indemnification</h2>
            <p className="text-primary/90">
              You agree to indemnify, defend and hold us harmless, from and against any and all claims, liabilities, damages, losses and expenses, relating to your violation of these Terms and conditions, and applicable laws, including intellectual property rights and privacy rights. You will promptly reimburse us for our damages, losses, costs and expenses relating to or arising out of such claims.
            </p>
          </section>

          {/* Waiver */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">17. Waiver</h2>
            <p className="text-primary/90">
              Failure to enforce any of the provisions set out in these Terms and Conditions and any Agreement, or failure to exercise any option to terminate, shall not be construed as waiver of such provisions and shall not affect the validity of these Terms and Conditions or of any Agreement or any part thereof, or the right thereafter to enforce each and every provision.
            </p>
          </section>

          {/* Language */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">18. Language</h2>
            <p className="text-primary/90">
              These Terms and Conditions will be interpreted and construed exclusively in English. All notices and correspondence will be written exclusively in that language.
            </p>
          </section>

          {/* Entire Agreement */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">19. Entire Agreement</h2>
            <p className="text-primary/90">
              These Terms and Conditions shall constitute the entire agreement between you and Dinesh Tilmasina in relation to your use of this website.
            </p>
          </section>

          {/* Updating of Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">20. Updating of These Terms and Conditions</h2>
            <p className="text-primary/90">
              We may update these Terms and Conditions from time to time. The date provided at the beginning of these Terms and Conditions is the latest revision date. We will give you a written notice of any changes or updates, and the revised Terms and Conditions will become effective from the date that we give you such a notice. Your continued use of this website following the posting of changes or updates will be considered notice of your acceptance to abide by and be bound by these Terms and Conditions. To request a prior version of these Terms and conditions, please contact us.
            </p>
          </section>

          {/* Choice of Law */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">21. Choice of Law and Jurisdiction</h2>
            <p className="text-primary/90">
              These Terms and Conditions shall be governed by the laws of Nepal. Any disputes relating to these Terms and Conditions shall be subject to the jurisdiction of the courts of Nepal. If any part or provision of these Terms and Conditions is found by a court or other authority to be invalid and/or unenforceable under applicable law, such part or provision will be modified, deleted and/or enforced to the maximum extent permissible so as to give effect to the intent of these Terms and Conditions. The other provisions will not be affected.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">22. Contact Information</h2>
            <p className="text-primary/90">
              This website is owned and operated by Dinesh Tilmasina.
            </p>
            <p className="text-primary/90">
              You may contact us regarding these Terms and Conditions by writing or emailing us at:
              <br />
              Email: meditationastro1@gmail.com
              <br />
              Address: Katmandu, 44600
            </p>
          </section>

          {/* Download */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">23. Download</h2>
            <p className="text-primary/90">
              You can also download our Terms and Conditions as a PDF.
            </p>
          </section>

          {/* Final Note */}
          <section className="mt-8 pt-8 border-t border-primary/20">
            <p className="text-primary/80 text-sm">
              These Terms and Conditions shall be governed by the laws of Nepal. Any disputes relating to these Terms and Conditions shall be subject to the jurisdiction of the courts of Nepal.
            </p>
          </section>
        </Card>
      </motion.div>
    </div>
  )
}
