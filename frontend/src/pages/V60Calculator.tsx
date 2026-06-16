import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import type { BrewType, Ratio, V60RecipeResult } from "../types/v60";

function V60Calculator() {
  const { user } = useAuth();

  const [brewType, setBrewType] = useState<BrewType>("hot");
  const [coffeeGrams, setCoffeeGrams] = useState<number>(20);
  const [ratio, setRatio] = useState<Ratio>(15);
  const [recipe, setRecipe] = useState<V60RecipeResult | null>(null);

  async function handleGenerateRecipe() {
    try {
      const response = await fetch("http://localhost:5000/api/v60/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brewType,
          coffeeGrams,
          ratio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to generate recipe");
        return;
      }

      setRecipe(data.recipe);
    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend");
    }
  }

  async function handleSaveRecipe() {
    if (!recipe) return;

    if (!user) {
      alert("Please login to save recipes.");
      return;
    }

    try {
      await api.post("/recipes", recipe);
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save recipe.");
    }
  }

  return (
    <main className="min-h-screen bg-[#1A120B] text-white">
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="text-[#D5A373] uppercase tracking-[0.25em] text-sm mb-3">
            V60 Calculator
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build your V60 recipe
          </h1>

          <p className="text-white/70 max-w-2xl">
            Choose your brew type, coffee amount, and ratio. BloomLab will
            prepare a simple brewing guide for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-[#24160F] border border-[#3C2A21] rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Calculator form</h2>

            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-white/80">Brew type</label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBrewType("hot")}
                    className={`rounded-xl py-3 font-medium transition ${
                      brewType === "hot"
                        ? "bg-[#D5A373] text-[#1A120B]"
                        : "bg-[#1A120B] text-white border border-[#3C2A21] hover:bg-[#3C2A21]"
                    }`}
                  >
                    Hot V60
                  </button>

                  <button
                    onClick={() => setBrewType("iced")}
                    className={`rounded-xl py-3 font-medium transition ${
                      brewType === "iced"
                        ? "bg-[#D5A373] text-[#1A120B]"
                        : "bg-[#1A120B] text-white border border-[#3C2A21] hover:bg-[#3C2A21]"
                    }`}
                  >
                    Iced V60
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-3 text-white/80">
                  Coffee amount
                </label>

                <input
                  type="number"
                  min="1"
                  value={coffeeGrams}
                  onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                  className="w-full rounded-xl bg-[#1A120B] border border-[#3C2A21] px-4 py-3 outline-none focus:border-[#D5A373]"
                />
              </div>

              <div>
                <label className="block mb-3 text-white/80">Ratio</label>

                <select
                  value={ratio}
                  onChange={(e) => setRatio(Number(e.target.value) as Ratio)}
                  className="w-full rounded-xl bg-[#1A120B] border border-[#3C2A21] px-4 py-3 outline-none focus:border-[#D5A373]"
                >
                  <option value={14}>1:14 - Strong, heavier</option>
                  <option value={15}>1:15 - Balanced strong</option>
                  <option value={16}>1:16 - Balanced classic</option>
                  <option value={17}>1:17 - Cleaner, lighter</option>
                </select>
              </div>

              <button
                onClick={handleGenerateRecipe}
                className="w-full bg-[#D5A373] text-[#1A120B] font-bold rounded-xl py-3 hover:bg-[#c7925f] transition"
              >
                Generate recipe
              </button>
            </div>
          </div>

          {/* Generated Recipe Card */}
          <div className="bg-[#24160F] border border-[#3C2A21] rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Generated recipe
            </h2>

            {!recipe ? (
              <div className="h-full flex items-center justify-center text-white/50 text-center">
                Enter your values and generate your V60 recipe.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard label="Coffee" value={`${recipe.coffeeGrams}g`} />
                  <InfoCard label="Ratio" value={`1:${recipe.ratio}`} />
                  <InfoCard
                    label="Total target"
                    value={`${recipe.totalWater}ml`}
                  />
                  <InfoCard
                    label="Hot water"
                    value={`${recipe.hotWater}ml`}
                  />
                  <InfoCard label="Ice" value={`${recipe.ice}g`} />
                  <InfoCard
                    label="Bloom"
                    value={`${recipe.bloomWater}ml`}
                  />
                  <InfoCard
                    label="Remaining water"
                    value={`${recipe.remainingWater}ml`}
                  />
                  <InfoCard
                    label="Pours"
                    value={`${recipe.numberOfPours}`}
                  />
                </div>

                <button
                  onClick={handleSaveRecipe}
                  className="w-full mt-4 border border-[#D5A373] text-[#D5A373] rounded-xl py-3 hover:bg-[#D5A373] hover:text-[#1A120B] transition"
                >
                  Save this recipe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Brewing Schedule */}
        {recipe && (
          <section className="mt-8 bg-[#24160F] border border-[#3C2A21] rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Brewing schedule</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[#D5A373] border-b border-[#3C2A21]">
                  <tr>
                    <th className="py-3">Time</th>
                    <th className="py-3">Action</th>
                    <th className="py-3">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {recipe.schedule.map((step, index) => (
                    <tr key={index} className="border-b border-[#3C2A21]/60">
                      <td className="py-4 text-white/80">{step.time}</td>
                      <td className="py-4">{step.action}</td>
                      <td className="py-4 text-[#D5A373] font-semibold">
                        {step.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tips */}
        <section className="mt-8 bg-[#24160F] border border-[#3C2A21] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Tips</h2>

          <ul className="space-y-3 text-white/70">
            <li>Use medium-fine grind size for a balanced V60 extraction.</li>
            <li>Bloom with around 2× the coffee weight.</li>
            <li>For iced V60, add ice to the server before brewing.</li>
            <li>
              If the coffee tastes sour, try grinding finer or using hotter
              water.
            </li>
            <li>If the coffee tastes bitter, try grinding coarser.</li>
          </ul>
        </section>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1A120B] border border-[#3C2A21] rounded-xl p-4">
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default V60Calculator;