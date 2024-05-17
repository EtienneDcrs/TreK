import Container from "../Container";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Searchbar from "./Searchbar";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
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
                            <NavItem currentUser={currentUser} />
                        </div>

                        <div className="flex flex-row items-center">
                            <Searchbar />
                            <UserMenu currentUser={currentUser} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
