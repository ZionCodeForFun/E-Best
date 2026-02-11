import { useState, useEffect, useRef } from "react";
const CustomSelect = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options
    .filter((option) => option != null) // skip undefined/null
    .filter((option) =>
      option.toString().toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)}>
        {value || placeholder}
        <span className={`arrow ${isOpen ? "open" : ""}`} />
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          <input
            type="text"
            className="custom-select-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul className="custom-select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <li
                  key={idx}
                  className="custom-select-option"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="custom-select-no-option">
                No results found for "<strong>{search}</strong>".
                <a
                  href={`https://wa.me/+2348133369509?text=Hello, I would like to request a car: ${encodeURIComponent(
                    search,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-select-request-btn"
                >
                  Request this car on WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
