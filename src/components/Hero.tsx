const Hero = () => {
  return (
    <div className="text-center mt-16">
      <h1 className="text-white text-5xl font-semibold mb-10">
        How’s the sky looking today?
      </h1>

      <div className="flex items-center justify-center gap-4">
        
        {/* Search Input */}
        <div className="flex items-center bg-[hsl(243,27%,20%)] px-4 py-3 rounded-lg w-[28rem] shadow-lg">
          <img
            src="/assets/images/icon-search.svg"
            alt="Search icon"
            className="w-5 h-5 opacity-80 mr-3"
          />
          <input
            type="search"
            placeholder="Search for a place..."
            className="flex-1 bg-transparent text-white placeholder:text-white placeholder:opacity-60 focus:outline-none text-lg"
          />
        </div>

        {/* Search Button */}
        <button className="bg-[hsl(248,70%,36%)] hover:bg-[hsl(248,70%,40%)] px-6 py-3 rounded-lg text-white font-semibold transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;
