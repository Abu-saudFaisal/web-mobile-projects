import { useState } from "react";

type AddCafeModalProps = {
  onClose: () => void;
  onAddCafe: (cafe: {
    name: string;
    location: string;
    description: string;
    imageUrl?: string;
  }) => void;
};

function AddCafeModal({ onClose, onAddCafe }: AddCafeModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !location || !description) return;

    onAddCafe({
      name,
      location,
      description,
      imageUrl: imageUrl || undefined,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="bg-[#2A1B12] border border-[#3C2A21] rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-5">Add New Cafe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Cafe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1A120B] text-white border border-[#3C2A21] rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Location / city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#1A120B] text-white border border-[#3C2A21] rounded-xl px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-[#1A120B] text-white border border-[#3C2A21] rounded-xl px-4 py-3 outline-none resize-none"
          />

          <input
            type="text"
            placeholder="Image URL optional"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-[#1A120B] text-white border border-[#3C2A21] rounded-xl px-4 py-3 outline-none"
          />

          <div className="flex gap-3 pt-3">
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
              Add Cafe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCafeModal;