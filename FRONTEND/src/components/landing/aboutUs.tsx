export default function AboutUs() {
  return (
    <div className="min-h-screen  bg-[#F5F1FF] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-[#4E3B84] mb-6">
          About FinTrack
        </h1>

        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
          FinTrack is built with a simple mission — to help people take control
          of their money with clarity, smart insights, and modern tools.
          We believe financial freedom should be accessible to everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          <div className="p-6 bg-white rounded-xl shadow text-center border">
            <h3 className="font-semibold text-xl text-[#4E3B84] mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Empower users with smart tools to manage money stress-free.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow text-center border">
            <h3 className="font-semibold text-xl text-[#4E3B84] mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              A future where every individual feels confident about finances.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow text-center border">
            <h3 className="font-semibold text-xl text-[#4E3B84] mb-2">
              Our Promise
            </h3>
            <p className="text-gray-600">
              Secure, modern, and easy-to-use tools for money management.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
