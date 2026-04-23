import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookingForm from "@/components/forms/BookingForm";

export const metadata = {
  title: "Book an Appointment | GreenCut Lawn Services",
  description: "Schedule your lawn care service online. Mowing, edging, and leaf blowing available.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-[#f8fbf9]">
        {/* Header */}
        <div className="bg-[#2D6A4F] text-white py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Book an Appointment</h1>
            <p className="text-green-200 text-lg">
              Fill out the form below and we&apos;ll confirm your appointment shortly.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
            <BookingForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
