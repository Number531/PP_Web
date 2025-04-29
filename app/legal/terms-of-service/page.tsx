import Link from "next/link"

export const metadata = {
  title: "Terms of Service | PSQRD",
  description: "Our terms of service outline the rules and guidelines for using our platform and services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-purple-400">Terms of Service</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-lg mb-6">Last Updated: April 21, 2025</p>

            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and PSQRD ("we,"
              "our," or "us") regarding your access to and use of our website, products, and services (collectively, the
              "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
              Terms, you may not access or use the Services.
            </p>

            <h2>2. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by
              posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the
              Services after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>3. Eligibility</h2>
            <p>
              You must be at least 16 years old to use our Services. By using our Services, you represent and warrant
              that you meet all eligibility requirements. If you are using the Services on behalf of an entity, you
              represent and warrant that you have the authority to bind that entity to these Terms.
            </p>

            <h2>4. Account Registration</h2>
            <p>
              To access certain features of our Services, you may need to register for an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>5. User Content</h2>
            <p>
              Our Services may allow you to submit, upload, publish, or otherwise make available content, including but
              not limited to text, photographs, videos, and audio (collectively, "User Content").
            </p>
            <p>
              You retain all rights in, and are solely responsible for, the User Content you submit. By submitting User
              Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, create
              derivative works based upon, distribute, and display your User Content for the purpose of operating and
              providing the Services.
            </p>

            <h2>6. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other
                users from fully enjoying the Services
              </li>
              <li>Use the Services in any way that violates applicable laws or regulations</li>
              <li>Use the Services to engage in any harassing, threatening, intimidating, or predatory conduct</li>
              <li>Attempt to circumvent any content-filtering techniques we employ</li>
              <li>
                Attempt to access or search the Services through the use of any engine, software, tool, agent, device,
                or mechanism other than the software and/or search agents provided by us
              </li>
              <li>
                Collect or store any personally identifiable information from the Services without express permission
              </li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
              <li>Violate any third-party rights, including intellectual property rights</li>
              <li>Use the Services for any illegal or unauthorized purpose</li>
            </ul>

            <h2>7. Intellectual Property Rights</h2>
            <p>
              The Services and their entire contents, features, and functionality (including but not limited to all
              information, software, text, displays, images, video, and audio, and the design, selection, and
              arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected
              by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h2>8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the Services at any time, with or without
              cause, and with or without notice. Upon termination, your right to use the Services will immediately
              cease.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT,
              PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES
              FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR
              USE OF, OR INABILITY TO USE, THE SERVICES.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              without regard to its conflict of law provisions. Any legal action or proceeding arising out of or
              relating to these Terms shall be brought exclusively in the federal or state courts located in San
              Francisco County, California.
            </p>

            <h2>12. Dispute Resolution</h2>
            <p>
              Any dispute arising from or relating to these Terms or the Services will first be resolved through good
              faith negotiations. If such negotiations fail, the dispute shall be resolved through binding arbitration
              in accordance with the rules of the American Arbitration Association.
            </p>

            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and
              interpreted to accomplish the objectives of such provision to the greatest extent possible under
              applicable law, and the remaining provisions will continue in full force and effect.
            </p>

            <h2>14. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and us regarding the use of the Services,
              superseding any prior agreements between you and us relating to your use of the Services.
            </p>

            <h2>15. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: legal@psqrd.com
              <br />
              Address: 123 Tech Plaza, San Francisco, CA 94105
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
