import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import QuoteForm from "@/components/forms/QuoteForm";

export const metadata = {
  title: "Get a Free Quote | GreenCut Lawn Services",
  description: "Request a free lawn care quote. No commitment required.",
};

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-[#f8fbf9]">
        {/* Header */}
        <div className="bg-[#52B788] text-white py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Get a Free Quote</h1>
            <p className="text-green-50 text-lg">
              Not ready to book yet? Tell us about your lawn and we&apos;ll get back to you with pricing.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
