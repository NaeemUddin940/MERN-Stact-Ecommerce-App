import React, { useState } from "react";
import { Star } from "lucide-react";

interface ProductReviewProps {
  title: string;
  text: string;
  reviewer?: string;
  rating?: number; // 1 to 5
}

const ProductReview: React.FC<ProductReviewProps> = ({
  title,
  text,
  reviewer = "Anonymous",
  rating = 5,
}) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  const [ratings, setRating] = useState(0);
  return (
    <div>
      <div className="border-b border-slate-300 shadow-shadow border-2 shadow-md last:border-b-0 p-4 md:p-6 rounded-lg transition-shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className="flex space-x-1">
            {Array(fullStars)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={`full-${i}`}
                  className="w-4 h-4 fill-yellow-500 text-yellow-500"
                />
              ))}
            {Array(emptyStars)
              .fill(0)
              .map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
              ))}
          </div>
        </div>

        <p className="text-foreground/70 mb-2">{text}</p>
        <span className="text-sm text-foreground/50">— {reviewer}</span>
      </div>
      <div className="my-3 border-slate-300 shadow-shadow border-2 shadow-md rounded-2xl">
        <div className=" rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Write a Review
          </h2>

          {/* Star Rating */}
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  ratings >= star
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-foreground"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
            <span className="ml-3 text-foreground">{rating} of 5 stars</span>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border placeholder:text-foreground/70 border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Review
            </label>
            <textarea
              placeholder="Write your review here..."
              className="w-full border placeholder:text-foreground/70 border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
