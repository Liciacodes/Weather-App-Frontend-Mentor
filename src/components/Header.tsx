interface UnitTogglerProps {
  units: "metric" | "imperial";
  setUnits: (units: "metric" | "imperial") => void;
}

const Header = ({ units, setUnits }: UnitTogglerProps) => {
  return (
    <header className="flex justify-between items-center py-6 px-20">
      <img src="/assets/images/logo.svg" alt="Logo" />

      {/* Dropdown Wrapper */}
      <div className="relative">
        {/* Icon positioned inside the select */}
        <img
          src="/assets/images/icon-units.svg"
          alt="units icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-80 pointer-events-none"
        />

        {/* Select box */}
        <select
          className="
            appearance-none 
            pl-8 pr-6 py-2 
            bg-[hsl(243,27%,20%)] text-[hsl(240,6%,70%)]
            rounded-lg outline-none cursor-pointer 
            font-medium focus:ring-2 focus:ring-white focus:ring-opacity-50
          "
          value={units}
          onChange={(e) => setUnits(e.target.value as "metric" | "imperial")}
        >
          <option value="metric">Units</option>
          <option value="imperial">Imperial</option>
        </select>

        {/* The dropdown arrow (custom) */}
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-70 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
