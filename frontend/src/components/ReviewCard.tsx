import type { Review } from "../types/review";

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#1A120B] border border-[#3C2A21] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition">
      {review.imageUrl && (
        <img
          src={review.imageUrl}
          alt={review.itemName}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <span className="inline-block mb-3 text-xs bg-[#D5A373]/15 text-[#D5A373] px-3 py-1 rounded-full">
          {review.category}
        </span>

        <h3 className="text-xl font-bold text-white mb-2">
          {review.itemName}
        </h3>

        <p className="text-[#D5A373] font-semibold mb-3">
          ⭐ {review.rating}/5
        </p>

        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {review.summary}
        </p>

        <p className="text-sm text-gray-400 mb-5">
          By: <span className="text-white">{review.reviewer}</span>
        </p>

        <div className="flex justify-between items-center text-sm">
          <button className="text-gray-300 hover:text-[#D5A373] transition">
            ♡ {review.likes} likes
          </button>

          <button className="text-gray-300 hover:text-[#D5A373] transition">
            🔖 {review.isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;