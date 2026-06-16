import FeatureCard from "../components/FeatureCard";
import v60Hero from "../assets/v60Hero.png";

const features = [
  {
    icon: "1:16",
    title: "V60 Calculator",
    description:
      "Prepare your V60 using our calculator. Calculate water, ice, bloom time, and pours.",
    route: "/calculator",
  },
  {
    icon: "☕📌",
    title: "Cafes List",
    description:
      "Add cafés you visited and help others discover great coffee spots through ratings.",
    route: "/cafes",
  },
  {
    icon: "✍️",
    title: "Reviews",
    description:
      "Share and explore personal reviews about coffee beans, machines, tools, and V60 recipes.",
    route: "/reviews",
  },
];

function Home() {
  return (
    <>
      <section
        className="min-h-[calc(100vh-88px)] bg-cover bg-no-repeat text-white"
        style={{
          backgroundImage: `url(${v60Hero})`,
          backgroundPosition: "center right",
        }}
      >
        <div className="min-h-[calc(100vh-88px)] bg-black/35 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <p className="text-[#D5A373] uppercase tracking-[0.25em] mb-5 text-base">
                Coffee Community
              </p>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Let’s enrich the coffee community with{" "}
                <span className="text-[#D5A373]">BloomLab</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl">
                Discover hidden gems, share personal reviews, and explore coffee
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A120B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#D5A373] uppercase tracking-[0.25em] mb-3">
              What BloomLab Offers
            </p>

            <h2 className="text-4xl font-bold">For coffee lovers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                route={feature.route}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;