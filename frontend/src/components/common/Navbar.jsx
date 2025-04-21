import Logo from "./Logo";
import SearchBox from "./SearchBox";
import DropDownMenu from './DropDownMenu';

function Navbar() {


  return (
    <header className="fixed top-0 z-50 h-14 right-0 left-0 ">
      <nav className="container mx-auto flex items-center justify-between gap-4" >
        <div>
          <Logo />
        </div>

        <div className="flex items-center gap-3">
          <SearchBox />
          <DropDownMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navbar