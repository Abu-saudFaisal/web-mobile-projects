function Footer() {
  return (
    <footer className="bg-[#1A120B] border-t border-[#3C2A21] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h3 className="text-xl font-bold text-[#D5A373]">
            BloomLab
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Built for coffee lovers.
          </p>
        </div>

        <p className="text-gray-400 text-sm mt-4 md:mt-0">
          © 2026 BloomLab. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;