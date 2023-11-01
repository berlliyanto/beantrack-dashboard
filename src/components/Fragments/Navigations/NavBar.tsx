import Hamburger from "../../Elements/Hamburger/Hamburger";

const NavBar = () => {

    return (
        <header className="flex justify-between items-center h-[96px] w-full py-[24px] px-[16px] md:hidden">
            <div>
                <img src="images/3_BEANTRACK.svg" alt="" />
            </div>
            <Hamburger />
        </header>
    )
}

export default NavBar;