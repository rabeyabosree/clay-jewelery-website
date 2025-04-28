import Logo from "./Logo";
import SearchBox from "./SearchBox";
import DropDownMenu from './DropDownMenu';
import NavMenu from './NavMenu';
import { useEffect, useState } from "react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 z-50 right-0 left-0 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-yellow-100 shadow-lg ' : 'bg-white shadow-none'}`}>
      <nav className="container mx-auto flex items-center justify-between gap-4">
        <div>
          <Logo />
        </div>

        <div>
          <NavMenu />
        </div>

        <div className="flex items-center gap-3">
          <SearchBox />
          <DropDownMenu />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

