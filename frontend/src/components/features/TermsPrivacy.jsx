export default function TermsPrivacy() {
  return (
    <div className="max-w-4xl sm:mx-auto p-6 space-y-10 text-gray-800">
      <div className="m-2 sm:flex gap-5 justify-center items-center">
        <section>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We collect minimal personal information to provide services.
            </li>
            <li>Technical data may be used for analytics and security.</li>
            <li>We use cookies to manage sessions and preferences.</li>
            <li>
              We don’t sell your data. We share only with trusted partners.
            </li>
            <li>You can request access or deletion of your data anytime.</li>
            <li>We take security seriously with best practices in place.</li>
            <li>This policy may be updated; major changes will be notified.</li>
          </ul>
        </section>
        <section>
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <ul className="list-disc pl-6 space-y-2">
            <li>By using this app, you agree to these terms.</li>
            <li>You must be 13+ to register or use this service.</li>
            <li>You’re responsible for your account and password.</li>
            <li>Don't misuse the platform or engage in illegal activities.</li>
            <li>We reserve the right to suspend accounts for violations.</li>
            <li>We provide the service “as is” with no warranties.</li>
            <li>Our liability is limited as permitted by applicable laws.</li>
            <li>These terms are governed by the laws of your jurisdiction.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
