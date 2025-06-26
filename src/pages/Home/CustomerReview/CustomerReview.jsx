"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonials from "../../../assets/data/reviews.json";
import quote from "../../../assets/reviewQuote.png";
import customerTop from "../../../assets/customer-top.png";
export default function CustomerReview() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with center position
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 3 ? 2 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    // Ensure we don't go beyond bounds for 5-card view
    const clampedIndex = Math.max(2, Math.min(testimonials.length - 3, index));
    setCurrentIndex(clampedIndex);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 2 ? prev - 1 : testimonials.length - 3));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : 2));
  };

  const getVisibleCards = () => {
    return [
      currentIndex - 2, // Far left
      currentIndex - 1, // Near left
      currentIndex, // Center
      currentIndex + 1, // Near right
      currentIndex + 2, // Far right
    ];
  };

  const getCardStyle = (position) => {
    switch (position) {
      case -2: // Far left
        return {
          transform: "translateX(-57%) translateY(15%) scale(0.8)",
          opacity: 0.3,
          zIndex: 1,
        };
      case -1: // Near left
        return {
          transform: "translateX(-30%) scale(0.8) translateY(10%)",
          opacity: 0.5,
          zIndex: 2,
        };
      case 0: // Center
        return {
          transform: "translateX(0%) translateY(-20px) scale(1)",
          opacity: 1,
          zIndex: 5,
        };
      case 1: // Near right
        return {
          transform: "translateX(30%) scale(0.8) translateY(10%)",
          opacity: 0.5,
          zIndex: 2,
        };
      case 2: // Far right
        return {
          transform: "translateX(57%) scale(0.8) translateY(19%)",
          opacity: 0.3,
          zIndex: 1,
        };
      default:
        return {
          transform: "translateX(200%) scale(0.7)",
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  const visibleCardIndices = getVisibleCards();

  return (
    <div>
      <div className="text-center space-y-5">
        <img src={customerTop} alt="" className="mx-auto" />
        <h2 className="text-4xl">What our customers are sayings</h2>
        <p className="max-w-3xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div
        className="w-full max-w-7xl mx-auto py-5"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Carousel Container */}
        <div className="relative h-96 mb-8 overflow-hidden">
          {visibleCardIndices.map((cardIndex, position) => {
            const testimonial = testimonials[cardIndex];
            const relativePosition = position - 2; // Convert to -2, -1, 0, 1, 2
            return (
              <div
                key={`${testimonial.id}-${cardIndex}`}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                style={getCardStyle(relativePosition)}
              >
                <div className="rounded-xl card w-full max-w-[400px] bg-white shadow-xl border border-gray-100">
                  <div className="card-body p-8">
                    {/* Quote Icon */}

                    <img src={quote} alt="" className="w-10" />

                    {/* Testimonial Text */}
                    <p className="text-gray-600 text-base leading-relaxed">
                      {testimonial.review}
                    </p>
                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-300 my-3"></div>
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center`}>
                        <img
                          src={testimonial.user_photoURL}
                          alt=""
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-white font-semibold text-lg">
                          {testimonial.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {testimonial.userName}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {testimonial.user_email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="p-1 btn-circle bg-white/80 hover:bg-[#CAEB66] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.slice(2, testimonials.length - 2).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index + 2)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index + 2 === currentIndex
                    ? "bg-[#CAEB66] scale-125"
                    : "bg-gray-300 hover:bg-[#CAEB66]"
                }`}
                aria-label={`Go to testimonial ${index + 3}`}
              />
            ))}
          </div>
          {/* Next Button */}
          <button
            onClick={goToNext}
            className="p-1 btn-circle bg-white/80 hover:bg-[#CAEB66] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
        {/* Auto-play Indicator */}
        {/* <div className="text-center mt-4">
            <span className="text-xs text-[#CAEB66]">
              {isAutoPlaying
                ? "Auto-playing • Hover to pause"
                : "Paused • Move cursor away to resume"}
            </span>
          </div> */}
      </div>
    </div>
  );
}
