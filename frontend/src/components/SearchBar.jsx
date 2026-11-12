
import { Search, X } from "lucide-react";

function SearchBar({ search, setSearch }) {

  return (
    <div className="search-box">

      <Search size={19} />

      <input
        type="text"
        placeholder="Search employees by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;
