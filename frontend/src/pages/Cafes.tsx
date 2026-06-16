import { useState } from "react";
import type { Cafe } from "../types/cafe";
import CafeCard from "../components/cafe/CafeCard";
import AddCafeModal from "../components/cafe/AddCafeModal";
import RatingModal from "../components/cafe/RatingModal";

const initialCafes: Cafe[] = [
  {
    _id: "1",
    name: "Kava Coffee",
    location: "Muscat, Oman",
    description:
      "A cozy specialty coffee spot known for V60 and fruity beans.",
    addedBy: "faisal",
    averageRating: 4.6,
    ratingsCount: 23,
    imageUrl:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
  },
  {
    _id: "2",
    name: "Bloom Roastery",
    location: "Salalah, Oman",
    description:
      "A calm coffee shop with great espresso, filters, and seasonal beans.",
    addedBy: "azeez",
    averageRating: 4.3,
    ratingsCount: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
  },
];

function CafeRatings() {
  const [cafes, setCafes] = useState<Cafe[]>(initialCafes);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCafeModal, setShowAddCafeModal] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);

  const filteredCafes = cafes.filter((cafe) => {
    const search = searchTerm.toLowerCase();

    return (
      cafe.name.toLowerCase().includes(search) ||
      cafe.location.toLowerCase().includes(search) ||
      cafe.description.toLowerCase().includes(search)
    );
  });

  function handleAddCafe(newCafe: {
    name: string;
    location: string;
    description: string;
    imageUrl?: string;
  }) {
    const cafe: Cafe = {
      _id: Date.now().toString(),
      ...newCafe,
      addedBy: "currentUser",
      averageRating: 0,
      ratingsCount: 0,
    };

    setCafes((prev) => [cafe, ...prev]);
  }

  function handleSubmitRating(rating: number) {
    if (!selectedCafe) return;

    setCafes((prev) =>
      prev.map((cafe) => {
        if (cafe._id !== selectedCafe._id) return cafe;

        const totalRatingPoints =
          cafe.averageRating * cafe.ratingsCount + rating;

        const newRatingsCount = cafe.ratingsCount + 1;
        const newAverageRating = totalRatingPoints / newRatingsCount;

        return {
          ...cafe,
          averageRating: newAverageRating,
          ratingsCount: newRatingsCount,
        };
      })
    );
  }

  return (
    <main className="min-h-screen bg-[#1A120B] text-white">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[#D5A373] uppercase tracking-[0.25em] mb-3">
            Coffee Community
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cafe Ratings
          </h1>

          <p className="text-gray-300 max-w-2xl text-lg">
            Discover and rate coffee spots shared by the community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search cafes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#2A1B12] border border-[#3C2A21] text-white rounded-xl px-5 py-4 outline-none focus:border-[#D5A373]"
          />

          <button
            onClick={() => setShowAddCafeModal(true)}
            className="bg-[#D5A373] text-[#1A120B] px-6 py-4 rounded-xl font-semibold hover:bg-[#c58f5f] transition"
          >
            + Add Cafe
          </button>
        </div>

        {filteredCafes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCafes.map((cafe) => (
              <CafeCard
                key={cafe._id}
                cafe={cafe}
                onRate={setSelectedCafe}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#2A1B12] border border-[#3C2A21] rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold mb-2">No cafes found</h3>
            <p className="text-gray-400">
              Try another search or add a new cafe.
            </p>
          </div>
        )}
      </section>

      {showAddCafeModal && (
        <AddCafeModal
          onClose={() => setShowAddCafeModal(false)}
          onAddCafe={handleAddCafe}
        />
      )}

      {selectedCafe && (
        <RatingModal
          cafe={selectedCafe}
          onClose={() => setSelectedCafe(null)}
          onSubmitRating={handleSubmitRating}
        />
      )}
    </main>
  );
}

export default CafeRatings;