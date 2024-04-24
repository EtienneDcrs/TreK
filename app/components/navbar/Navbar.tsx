import Container from "../Container";
import Logo from "./Logo";
import Menu from "./Menu";
import NavItem from "./NavItem";
import Searchbar from "./Searchbar";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-3 border-b-[1px]">
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-1                    
                            "
                    >
                        <div className="flex flex-row justify-between items-center gap-4">

                            <Logo />
                            <NavItem />
                        </div>
                        
                        <div className="flex flex-row items-center">
                            <Searchbar />
                            <Menu />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;