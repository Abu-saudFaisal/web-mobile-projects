import { useState } from "react";
import type { Cafe } from "../../types/cafe";

type RatingModalProps = {
  cafe: Cafe;
  onClose: () => void;
  onSubmitRating: (rating: number, comment: string) => void;
};

function RatingModal({ cafe, onClose, onSubmitRating }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating < 1) return;

    onSubmitRating(rating, comment);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="bg-[#2A1B12] border border-[#3C2A21] rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">
          Rate {cafe.name}
        </h2>

        <p className="text-gray-400 mb-5">{cafe.location}</p>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Comment optional"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full bg-[#1A120B] text-white border border-[#3C2A21] rounded-xl px-4 py-3 outline-none resize-none mb-5"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#D5A373] text-[#D5A373] py-3 rounded-xl hover:bg-[#D5A373]/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-[#D5A373] text-[#1A120B] py-3 rounded-xl font-semibold hover:bg-[#c58f5f] transition"
            >
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingModal;