import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | PSQRD",
  description: "Our privacy policy explains how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-purple-400">Privacy Policy</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-lg mb-6">Last Updated: April 21, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to PSQRD ("we," "our," or "us"). We are committed to protecting your privacy and personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>

            <h3>2.1 Personal Data</h3>
            <p>
              When you interact with our website or services, we may collect personal information such as your name,
              email address, phone number, and company information. This information is collected when you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a demo</li>
              <li>Contact our support team</li>
              <li>Apply for a job</li>
            </ul>

            <h3>2.2 Usage Data</h3>
            <p>We automatically collect certain information about how you interact with our website, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages visited and time spent</li>
              <li>Device information</li>
            </ul>

            <h3>2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store certain
              information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Understand and analyze how you use our services</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you about our services, updates, and other information</li>
              <li>Process transactions and send related information</li>
              <li>Find and prevent fraud</li>
              <li>For compliance purposes, including enforcing our Terms of Service</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li>
                <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
                providers, contractors, or agents who perform services for us.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or
                during negotiations of, any merger, sale of company assets, financing, or acquisition.
              </li>
              <li>
                <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we
                will require those affiliates to honor this Privacy Policy.
              </li>
              <li>
                <strong>With Business Partners:</strong> We may share your information with our business partners to
                offer you certain products, services, or promotions.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
                your consent.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or
                in response to valid requests by public authorities.
              </li>
            </ul>

            <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information.
              While we have taken reasonable steps to secure the information you provide to us, please be aware that no
              security measures are perfect or impenetrable, and no method of data transmission can be guaranteed
              against interception or other types of misuse.
            </p>

            <h2>6. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access the personal information we have about you</li>
              <li>The right to rectify inaccurate personal information</li>
              <li>The right to request the deletion of your personal information</li>
              <li>The right to restrict the processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to object to the processing of your personal information</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Email: privacy@psqrd.com
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
