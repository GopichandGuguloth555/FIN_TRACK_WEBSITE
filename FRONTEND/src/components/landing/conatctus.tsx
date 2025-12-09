export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-[#4E3B84] text-center mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
          Have a question, feedback, or need support?  
          We're here to help you make the most of FinTrack.
        </p>

        <form className="bg-[#F8F7FC] p-10 rounded-2xl shadow border space-y-6">

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#4E3B84]"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#4E3B84]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#4E3B84]"
              placeholder="How can we help?"
            ></textarea>
          </div>

          <button
            className="
              w-full py-3 bg-[#4E3B84] text-white rounded-lg text-lg
              hover:bg-[#39286A] transition shadow-md
            "
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}
