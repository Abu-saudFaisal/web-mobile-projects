import { useState } from "react";
import ReviewCard from "../components/ReviewCard";
import type { Review, ReviewCategory } from "../types/review";

const categories: ReviewCategory[] = [
  "Machines",
  "Tools",
  "Beans",
  "V60 Recipes",
];

const mockReviews: Review[] = [
  {
    id: "1",
    itemName: "Comandante C40",
    category: "Tools",
    rating: 4.8,
    summary: "Great grinder for V60, very consistent but expensive.",
    reviewer: "Faisal",
    likes: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1200",
  },
  {
    id: "2",
    itemName: "Ethiopia Sidama",
    category: "Beans",
    rating: 4.7,
    summary: "Floral aroma with grape notes and bright acidity.",
    reviewer: "Ahmed",
    likes: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200",
  },
  {
    id: "3",
    itemName: "Iced V60 Sweet Recipe",
    category: "V60 Recipes",
    rating: 4.6,
    summary: "Balanced iced V60 recipe with sweetness and low bitterness.",
    reviewer: "Sara",
    likes: 31,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200",
  },
  {
    id: "4",
    itemName: "Breville Barista Express",
    category: "Machines",
    rating: 4.4,
    summary: "Good beginner espresso machine with solid value.",
    reviewer: "Omar",
    likes: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200",
  },
];

function Reviews() {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("Machines");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = mockReviews.filter((review) => {
    const matchesCategory = review.category === activeCategory;

    const matchesSearch =
      review.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0F0A06] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D5A373] mb-4">
            ReviewsBloom
          </h1>
          <p className="text-gray-300 text-lg">
            Discover real coffee experiences from the community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 bg-[#1A120B] border border-[#3C2A21] rounded-xl px-4 py-3 text-white outline-none focus:border-[#D5A373]"
          />

          <button className="bg-[#D5A373] text-[#1A120B] font-semibold px-6 py-3 rounded-xl hover:bg-[#c28f5f] transition">
            + Add Review
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border transition ${
                activeCategory === category
                  ? "bg-[#D5A373] text-[#1A120B] border-[#D5A373]"
                  : "bg-transparent text-gray-300 border-[#3C2A21] hover:bg-[#1A120B]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredReviews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-[#3C2A21] rounded-2xl bg-[#1A120B]">
            <p className="text-gray-300 text-lg">No reviews found.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Reviews;