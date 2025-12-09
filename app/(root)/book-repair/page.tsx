"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const BookRepairPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Vehicle, 2: Issue, 3: Location, 4: Providers, 5: Date & Time
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    variant: "",
    year: "",
  });
  const [repairIssue, setRepairIssue] = useState("");
  const [location, setLocation] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Mock providers data
  const providers = [
    {
      id: 1,
      name: "Local Auto Care",
      rating: 4.8,
      reviews: 124,
      distance: "0.8 km",
      price: 220,
      services: ["Brake Repairs", "Engine Diagnostics", "Transmission Service"],
      timeSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      isAvailable: true
    },
    {
      id: 2,
      name: "City Mechanic Services",
      rating: 4.6,
      reviews: 98,
      distance: "1.2 km",
      price: 180,
      services: ["Brake Repairs", "Electrical Repairs", "Engine Diagnostics"],
      timeSlots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
      isAvailable: true
    },
    {
      id: 3,
      name: "Premium Auto Workshop",
      rating: 4.9,
      reviews: 210,
      distance: "2.5 km",
      price: 250,
      services: ["Engine Repairs", "Transmission Service", "Suspension Repairs"],
      timeSlots: ["9:00 AM", "12:00 PM", "4:00 PM"],
      isAvailable: true
    }
  ];

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Final submission
      console.log("Booking details:", { vehicleDetails, repairIssue, location, selectedProvider, date, time });
      router.push("/confirmation");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#111] rounded-xl shadow-xl p-6 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Book a Repair</h1>
            <div className="mt-4 flex items-center">
              {[1, 2, 3, 4, 5].map((s, i) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= s ? "bg-[#bf953f] text-black" : "bg-gray-800 text-gray-500 border border-white/10"
                      }`}
                  >
                    {s}
                  </div>
                  {s < 5 && (
                    <div className={`h-1 flex-1 mx-2 ${step >= s + 1 ? "bg-[#bf953f]" : "bg-gray-800"}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span className={step >= 1 ? "text-[#bf953f]" : ""}>Vehicle</span>
              <span className={step >= 2 ? "text-[#bf953f]" : ""}>Issue</span>
              <span className={step >= 3 ? "text-[#bf953f]" : ""}>Location</span>
              <span className={step >= 4 ? "text-[#bf953f]" : ""}>Providers</span>
              <span className={step >= 5 ? "text-[#bf953f]" : ""}>Date & Time</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Make', 'Model', 'Variant', 'Year'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{field}</label>
                    <input
                      type="text"
                      name={field.toLowerCase()}
                      value={vehicleDetails[field.toLowerCase() as keyof typeof vehicleDetails]}
                      onChange={handleVehicleChange}
                      className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-[#bf953f] focus:border-[#bf953f] placeholder-gray-600"
                      placeholder={`e.g., ${field === 'Year' ? '2020' : field === 'Make' ? 'Toyota' : field === 'Model' ? 'Camry' : 'Hybrid'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Repair Issue</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Describe the Issue</label>
                <textarea
                  value={repairIssue}
                  onChange={(e) => setRepairIssue(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-[#bf953f] focus:border-[#bf953f] placeholder-gray-600"
                  placeholder="Describe the issue with your car in detail..."
                ></textarea>
              </div>
              <div className="pt-2">
                <h3 className="font-medium text-white mb-2">Common Issues</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Brake problems", "Engine issues", "Electrical faults",
                    "Suspension problems", "Cooling system", "Transmission issues"
                  ].map((issue) => (
                    <button
                      key={issue}
                      type="button"
                      className="p-3 border border-white/10 bg-black/50 rounded-lg text-left text-gray-300 hover:bg-white/5 hover:border-[#bf953f]/50 transition-colors"
                      onClick={() => setRepairIssue(issue)}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Service Location</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Postcode or Suburb</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-[#bf953f] focus:border-[#bf953f] placeholder-gray-600"
                  placeholder="Enter your postcode or suburb"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Choose a Provider</h2>
              <p className="text-gray-400">Select from available providers near {location || "your location"}</p>

              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedProvider === provider.id
                      ? "border-[#bf953f] bg-[#bf953f]/10"
                      : "border-white/10 bg-black hover:border-white/30"
                      }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-white">{provider.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex text-[#bf953f]">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${i < Math.floor(provider.rating) ? 'text-[#bf953f]' : 'text-gray-600'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-400">
                            {provider.rating} ({provider.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{provider.distance} away</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg text-white">${provider.price}</div>
                        <div className={`text-sm ${provider.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                          {provider.isAvailable ? 'Available' : 'Not available'}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {provider.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded border border-white/5"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Date & Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-[#bf953f] focus:border-[#bf953f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-[#bf953f] focus:border-[#bf953f]"
                  >
                    <option value="">Select a time</option>
                    {selectedProvider
                      ? providers.find(p => p.id === selectedProvider)?.timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))
                      : <option value="">Select a provider first</option>
                    }
                  </select>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#bf953f]/10 border border-[#bf953f]/20 rounded-lg">
                <h3 className="font-medium text-white mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Repair:</span>
                    <span className="font-medium text-white">{repairIssue || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span className="font-medium text-white">
                      {selectedProvider
                        ? providers.find(p => p.id === selectedProvider)?.name
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium text-white">
                      {selectedProvider
                        ? `$${providers.find(p => p.id === selectedProvider)?.price}`
                        : "TBD"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium text-white">{location || "Not entered"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg transition-colors ${step === 1
                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={step === 4 && selectedProvider === null}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${step === 4 && selectedProvider === null
                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                : "bg-gold-gradient text-white hover:opacity-90 shadow-lg"
                }`}
            >
              {step < 5 ? "Continue" : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRepairPage;