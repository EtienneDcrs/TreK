import Container from "../Container";
import Logo from "./Logo";
import NavItemWithSuspense from "./NavItem";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}
// component that renders the navbar
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
                            <Logo /> {/* display the logo */}
                            <NavItemWithSuspense
                                currentUser={currentUser}
                            />{" "}
                            {/* display the nav items */}
                        </div>

                        <div className="flex flex-row items-center">
                            <UserMenu currentUser={currentUser} />{" "}
                            {/* display the user menu (hamburger button) */}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
