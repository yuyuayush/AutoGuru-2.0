import React, { useState } from "react";
import { Info } from "lucide-react";
import { useContact } from "@/hooks/useContact";

const ContactForm = () => {
  // Hook initialization
  const { mutate, isPending } = useContact();

  const [formData, setFormData] = useState({
    bookingRef: "",
    name: "",
    phone: "",
    email: "",
    make: "",
    service: "",
    message: "",
  });

  //Handle Input Change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      service: formData.service || "General Inquiry",
      make: formData.make || "General",
    };

    mutate(payload, {
      onSuccess: () => {
        setFormData({
          bookingRef: "",
          name: "",
          phone: "",
          email: "",
          make: "",
          service: "",
          message: "",
        });
      },
    });
  };

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg border border-white/10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            name="bookingRef"
            value={formData.bookingRef}
            onChange={handleChange}
            placeholder="Booking Reference (Optional)"
            className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors placeholder:text-gray-500"
          />
          <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-help" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors placeholder:text-gray-500"
          />

          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors placeholder:text-gray-500"
          />
        </div>

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors placeholder:text-gray-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="Vehicle Brand (e.g. Toyota)"
            className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors placeholder:text-gray-500"
          />

          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            placeholder="Service Required (e.g. Oil Change)"
            className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors placeholder:text-gray-500"
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Comments"
          rows={4}
          className="w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf953f]/50 focus:border-[#bf953f] transition-colors resize-none placeholder:text-gray-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-70"
        >
          {isPending ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
export default ContactForm;
