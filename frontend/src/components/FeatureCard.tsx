import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  route: string;
}

function FeatureCard({
  icon,
  title,
  description,
  route,
}: FeatureCardProps) {
  return (
    <div className="bg-[#2A1C13] border border-[#3C2A21] rounded-2xl p-8 hover:border-[#D5A373] transition text-center flex flex-col">
      <div className="text-4xl mb-5">{icon}</div>

      <h3 className="text-2xl font-bold text-[#D5A373] mb-3">
        {title}
      </h3>

      <p className="text-gray-300 leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      <Link
        to={route}
        className="inline-flex items-center justify-center gap-2 bg-[#D5A373] text-[#1A120B] px-5 py-3 rounded-xl font-semibold hover:bg-[#e6b27d] transition"
      >
        Explore →
      </Link>
    </div>
  );
}

export default FeatureCard;