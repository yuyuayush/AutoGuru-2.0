import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
interface Review {
    id: number;
    customer: string;
    car: string;
    mechanic: string;
    rating: number;
    date: string;
    review: string;
    image: string;
}

interface RunningReviewsProps {
    reviews: Review[];
}

const RunningReviews: React.FC<RunningReviewsProps> = ({ reviews }) => {
    // Duplicate the list for seamless looping
    const duplicatedReviews = [...reviews, ...reviews];

    return (
        <section className="relative w-full py-24 bg-[url('/mechanic/review-bg.jpg')]  bg-center overflow-hidden">
            <style>
                {`
          @keyframes scroll-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll-left 40s linear infinite;
            will-change: transform;
          }
          .scroll-container:hover .animate-scroll {
            animation-play-state: paused;
          }
          /* Fade mask for blending cards into the background edges */
          .fade-mask::before, .fade-mask::after {
            content: '';
            position: absolute;
            top: 0;
            height: 100%;
            width: 10vw;
            z-index: 10;
            pointer-events: none;
          }
          .fade-mask::before {
            left: 0;
            background: linear-gradient(to right, #111111 0%, transparent 100%);
          }
          .fade-mask::after {
            right: 0;
            background: linear-gradient(to left, #111111 0%, transparent 100%);
          }
        `}
            </style>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Hear From Our Customers
                    </h2>
                </div>

                {/* Scrolling Container */}
                <div className="relative w-full overflow-hidden whitespace-nowrap scroll-container fade-mask py-4">
                    <div className="flex space-x-8 animate-scroll">
                        {duplicatedReviews.map((review, index) => (
                            <div
                                key={`${review.id}-${index}`}
                                className="bg-[#111] rounded-lg p-8 shadow-lg transform transition-transform hover:-translate-y-2 duration-300 w-[400px] flex-shrink-0 whitespace-normal border border-white/10"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-800">
                                        <Image
                                            src={review.image}
                                            alt={review.car}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg text-white">{review.customer}</h4>
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-sm text-white">{review.rating}.0</span>
                                                <Star size={12} className="text-[#bf953f] fill-[#bf953f]" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs text-gray-400">{review.car}</p>
                                            <span className="text-xs text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5 className="font-bold text-sm text-gray-200 mb-2">{review.mechanic}</h5>
                                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                                        {review.review}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RunningReviews;
