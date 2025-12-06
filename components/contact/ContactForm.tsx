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
    message: "",
  });

  //Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      service: formData.bookingRef || "General Inquiry", // Booking ref as 'service' field
      make: "Website Form",
    };

    mutate(payload, {
      onSuccess: () => {
        setFormData({
          bookingRef: "",
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      },
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            name="bookingRef"
            value={formData.bookingRef}
            onChange={handleChange}
            placeholder="Booking Reference"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-colors"
          />
          <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-help" />
        </div>

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-colors"
        />

        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-colors"
        />

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-colors"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Comments"
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-colors resize-none"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-70"
        >
          {isPending ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
export default ContactForm;
