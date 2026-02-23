"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
        
        <Card className="p-6 md:p-8 space-y-6 bg-white/80 backdrop-blur-sm border-primary/20">
          <section className="space-y-4">
            <p className="text-primary/90">
              At Meditation Astro, accessible from https//meditationastro.com, one of our top priorities is the privacy of our visitors. This Privacy Policy document contains types of information Meditation Astro collects and records and how we use it. If you have additional questions or require more information about our Privacy Policy, please do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with respect to information they shared and/or collected on Meditation Astro. This policy does not apply to any information collected offline or through channels other than this website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Consent</h2>
            <p className="text-primary/90">
              By using our website, you agree to our Privacy Policy and agree to its terms. Information we collect The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the time we ask you to provide your personal information. If you contact us directly, we may receive additional information about you, such as your name, email address, phone number, the content of the message and/or attachments you send us, and any other information you choose to provide.
            </p>
            <p className="text-primary/90">
              When you sign up for an Account, we may request your contact information, including things like name, company name, address, email address, and phone number. How we use your information We use the information we collect in a variety of ways, including to:
            </p>
            <ul className="list-disc pl-6 text-primary/90">
              <li>Provide, operate and maintain our website</li>
              <li>Improve, customize and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features and functionalities</li>
              <li>Communicate with you for customer service, updates, and marketing</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Log Files</h2>
            <p className="text-primary/90">
              Meditation Astro follows a standard procedure of using log files. These files record visitors when they visit websites. All hosting companies do this and it is part of the analysis of hosting services. Information collected by log files includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is to analyze trends, administer the site, track users&apos; movement around the website, and gather demographic information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Cookies and Web Beacons</h2>
            <p className="text-primary/90">
              Like any other website, Meditation Astro uses &apos;cookies&apos;. These cookies are used to store information, including visitor preferences and which website pages the visitor accessed or visited. The information is used to optimize the user experience by customizing our website content based on visitors&apos; browser type and/or other information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Third Party Privacy Policies</h2>
            <p className="text-primary/90">
              Meditation Astro&apos;s Privacy Policy does not apply to other advertisers or websites. Therefore, we recommend that you review the respective Privacy Policies of these third-party ad servers for more detailed information. It may include your practices and instructions on how to opt out of certain options. You can choose to disable cookies through your individual browser options. More detailed information on cookie management with specific web browsers can be found on the browsers&apos; respective websites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">CCPA Privacy Rights</h2>
            <p className="text-primary/90">
              Under the CCPA, California consumers have the right to:
            </p>
            <ul className="list-disc pl-6 text-primary/90">
              <li>Request disclosure of personal data collected about them</li>
              <li>Request deletion of their personal data</li>
              <li>Opt-out of the sale of their personal data</li>
            </ul>
            <p className="text-primary/90">
              If you make a request, we have a month to respond to you. If you wish to exercise any of these rights, please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">GDPR Data Protection Rights</h2>
            <p className="text-primary/90">
              We would like to make sure you are aware of all your data protection rights. Every user has the right to:
            </p>
            <ul className="list-disc pl-6 text-primary/90">
              <li>Access copies of your personal data</li>
              <li>Rectification of inaccurate information</li>
              <li>Erasure of personal data</li>
              <li>Restrict processing of personal data</li>
              <li>Object to processing of personal data</li>
              <li>Data portability</li>
            </ul>
            <p className="text-primary/90">
              If you make a request, we have a month to respond to you. If you wish to exercise any of these rights, please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Information for Children</h2>
            <p className="text-primary/90">
              Another part of our priority is to add protection for children while using the Internet. We encourage parents and guardians to observe, participate, and/or monitor and guide your online activity. Meditation Astro does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child has provided this type of information on our website, we strongly encourage you to contact us immediately and we will do our best to promptly remove such information from our records.
            </p>
          </section>
        </Card>
      </motion.div>
    </div>
  )
}
