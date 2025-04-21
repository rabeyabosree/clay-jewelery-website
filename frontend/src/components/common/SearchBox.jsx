import React, { useState } from "react";
import Search from "./Search";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative z-50">
        <div className="h-full  py-8 flex flex-col gap-4">
          <Search
            open={isOpen}
            setOpen={setIsOpen}
            query={query}
            setQuery={setQuery}
          />
        </div>
      </div>
    </>
  );
}

export default SearchBox;


