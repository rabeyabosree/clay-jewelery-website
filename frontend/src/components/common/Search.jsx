import React from 'react';
import { X } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import SuggestedQuery from './SuggestedQuery';

function Search({ open, setOpen, query, setQuery }) {
  // Form submit handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      setOpen(true); // Sidebar opens only on submit
    }
  };

  return (
    <div className="relative z-50">
      {/* Overlay when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${
          open ? "w-[80%] sm:w-[60%] md:w-[40%]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="h-full px-6 py-8 flex flex-col gap-4">
          {/* Search input inside the panel */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewellery"
              className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            />
            <X
              size={20}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition"
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
            />
          </div>

          {/* Results / Suggestions */}
          <div className="flex-1 overflow-y-auto">
            {query ? (
              <div>Search Results for: {query}</div>
            ) : (
              <SuggestedQuery />
            )}
          </div>
        </div>
      </div>

      {/* Desktop: Form with input */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden lg:flex items-center border border-gray-400 rounded-md gap-2 px-4 py-2 w-full max-w-lg"
      >
        <CiSearch size={20} className="text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jewellery"
          className="flex-1 outline-none"
        />
      </form>

      {/* Mobile: Search Icon */}
      <div className="lg:hidden  ">
        {!open && (
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => setOpen(true)}
          >
            <CiSearch size={22} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;



