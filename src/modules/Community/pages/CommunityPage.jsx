import { useNavigate } from "react-router-dom"

export default function CommunityPage() {
  const Navigate = useNavigate()

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Header */}
      <section
        className="w-full h-[70vh] py-12 !px-4 md:!px-[5%] text-black text-left flex flex-col justify-center"
        style={{
          backgroundImage: `URL('https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/Your_All-in-One_Hub_for_a_Thriving_Creator_Pro_Community_htptgb')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <h1 className="!text-4xl md:!text-5xl font-bold !mb-4"> WonHubs Community</h1>
        <p className="max-w-3xl  !text-lg md:!text-xl">
          Welcome to Infinity Network: A Community Shaping the Future Way to Work.
        </p>
        <p className="max-w-3xl !text-sm !mt-2">
          a space built for users, teams, and partners to collaborate, learn, and inspire one another.
          Whether you're just starting out or scaling your business with WonHubs, you're not alone. Here, you’ll find people who’ve been where you are — and are happy to help.
        </p>
        <button
          type="button"
          onClick={() => Navigate('/community/home')}
          className="!bg-[#0476d3] w-fit text-white px-6 py-2 !rounded hover:!bg-[#0476d3]/80 hover:shadow-lg transition"
        >
          Join the Community
        </button>
      </section>

      <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
        <div className="flex gap-4 w-full">
          {/* Why Join */}
          <section>
            <h2 className="!text-3xl font-bold !mb-4">🌐 Why Join the Community?</h2>
            <ul className="list-disc list-inside space-y-4 text-[1rem]">
              <li>
                <strong>💬 Ask Questions & Get Help</strong><br />
                Stuck with a setup or need a workaround? Ask the community and get real-time answers.
              </li>
              <li>
                <strong>📚 Learn from Real Users</strong><br />
                Discover best practices, success stories, and use cases shared by businesses like yours.
              </li>
              <li>
                <strong>🛠️ Product Tips & How-Tos</strong><br />
                Learn shortcuts, time-saving tricks, and underused features straight from power users and our support team.
              </li>
              <li>
                <strong>🚀 Early Access & Feedback</strong><br />
                Get sneak peeks into upcoming features and share your input directly with our product team.
              </li>
              <li>
                <strong>🧠 Skill Building & Training</strong><br />
                Access live webinars, tutorials, and knowledge-sharing sessions to upskill yourself and your team.
              </li>
            </ul>
          </section>

          {/* Who Can Join */}
          <section className=" text-[1rem]">
            <h2 className="!text-3xl font-bold !mb-4">🙌 Who Can Join?</h2>
            <p className="mb-4">The community is open to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>WonHubs users (all plan levels)</li>
              <li>Partners & Resellers</li>
              <li>Developers & Integrators</li>
              <li>Trainers & Consultants</li>
              <li>Prospective customers exploring the platform</li>
            </ul>
          </section>
        </div>

        {/* What You'll Find */}
        <section>
          <h2 className="!text-3xl font-bold !mb-4">🗂️ What You’ll Find Here</h2>
          <div className="overflow-x-auto ">
            <table className="min-w-full border border-gray-200 text-[1rem]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Section</th>
                  <th className="border px-4 py-2 text-left">What It Offers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Discussion Forums", "Ask questions, join conversations, and troubleshoot issues"],
                  ["Product Updates", "Stay updated with the latest features and release notes"],
                  ["User Guides", "Step-by-step how-tos and downloadable resources"],
                  ["Webinars & Events", "Join live product demos, Q&As, and workshops"],
                  ["Success Stories", "Learn how other businesses are growing with WonHubs"],
                  ["Feature Requests", "Suggest new features or vote on improvements"],
                  ["Partner Connect", "Collaborate with vendors, consultants, and integrators"],
                ].map(([section, offer], i) => (
                  <tr key={i} className={i % 2 ? "bg-gray-50" : ""}>
                    <td className="border px-4 py-2 font-semibold">{section}</td>
                    <td className="border px-4 py-2">{offer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Join the Conversation */}
        <section className="bg-[#0476d3]/10 rounded-lg p-6 text-center space-y-4 text-[1rem]">
          <h2 className="!text-3xl font-bold text-[#14213d]">📬 Join the Conversation</h2>
          <p>Sign in with your WonHubs account and start engaging today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => Navigate('/community/home')}
              className="!bg-[#0476d3] text-white px-6 py-2 !rounded-full hover:!bg-[#0476d3] transition"
            >
              👉 Join the Community
            </button>
            <button
              type="button"
              onClick={() => Navigate('/community/guidelines')}
              className="border !border-[#0476d3] !text-[#0476d3] px-6 py-2 !rounded-full hover:!bg-[#0476d3]/10 transition"
            >
              👉 View Community Guidelines
            </button>
          </div>
          <p className="mt-2 text-sm">Need help? Email us at <a className="text-blue-600 underline" href="mailto:community@wonhubs.com">community@wonhubs.com</a></p>
        </section>

        {/* Closing Note */}
        <section className="text-center  text-[1rem]">
          <h2 className="!text-3xl font-bold !mb-4">❤️ Let's Grow Better — Together</h2>
          <p className="max-w-2xl mx-auto">
            At WonHubs, we believe in people-powered progress. The more we share, the more we grow.
            Jump into the community and be part of a movement that’s reimagining how modern teams work.
          </p>
        </section>
      </div>
      {/* Contact Us */}
      <section className="w-full bg-[#042154] text-white py-12 md:py-20 px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4"> Ready to Take Control of Your Business?</h2>
        <p className="w-full mx-auto mb-8 text-lg">
          Let WonHubs be your digital partner in growth.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            type="button"
            onClick={() => Navigate('/request/demo')}
            className="!bg-[#0476d3] !text-white !px-5 !py-3 !rounded-full hover:!bg-white hover:!text-black hover:!shadow transition duration-500"
          >
            Request a Free Demo
          </button>
          <button
            type="button"
            onClick={() => Navigate('/external/register')}
            className="border border-black !px-5 !py-3 text-black !rounded-full hover:!bg-black hover:!text-white transition duration-500"
          >
            Start Your Free Trial
          </button>
        </div>
        <div className="w-full mx-auto text-gray-50  flex items-center justify-center flex-wrap ">
          <p className="border-r-2 px-2 m-0">📞 Phone: +91-7893536373</p>
          <p className="border-r-2 px-2 m-0">📧 Email: support@wonhubs.com</p>
          <p className="border-r-2 px-2 m-0">📍 Location: Kanuru, Vijayawada, Andhra Pradesh India</p>
          <a href="https://wonhubs.com" className=" px-2 m-0">🌐 Website: wonhubs.com</a>
        </div>
        <p className="mt-2">Or fill out our contact form and we’ll get back to you within 24 hours.</p>
      </section>

      <footer className="text-center py-2 text-xs  bg-[#042154] text-white">
        © {new Date().getFullYear()} WonHubs. All rights reserved.
      </footer>
    </div>
  )
}
