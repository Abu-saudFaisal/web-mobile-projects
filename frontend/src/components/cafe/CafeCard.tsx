import type { Cafe } from "../../types/cafe";
import { formatRating } from "../../utils/ratingUtils";

type CafeCardProps = {
  cafe: Cafe;
  onRate: (cafe: Cafe) => void;
};

function CafeCard({ cafe, onRate }: CafeCardProps) {
  return (
    <div className="bg-[#2A1B12] border border-[#3C2A21] rounded-2xl overflow-hidden shadow-lg">
      {cafe.imageUrl && (
        <img
          src={cafe.imageUrl}
          alt={cafe.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{cafe.name}</h3>

        <p className="text-[#D5A373] mb-3">{cafe.location}</p>

        <p className="text-gray-300 mb-5 leading-relaxed">
          {cafe.description}
        </p>

        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-yellow-400 font-semibold">
              ⭐ {formatRating(cafe.averageRating)} / 5
            </p>
            <p className="text-gray-400 text-sm">
              {cafe.ratingsCount} ratings
            </p>
          </div>

          <p className="text-gray-400 text-sm">
            Added by {cafe.addedBy}
          </p>
        </div>

        <button
          onClick={() => onRate(cafe)}
          className="w-full bg-[#D5A373] text-[#1A120B] py-3 rounded-xl font-semibold hover:bg-[#c58f5f] transition"
        >
          Rate Cafe
        </button>
      </div>
    </div>
  );
}

export default CafeCard;