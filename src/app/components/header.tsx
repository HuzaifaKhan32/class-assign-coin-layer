import Logo from "../../../public/download.png";
import Image from "next/image";


const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="logo-container">
                    <Image
                    src={Logo}
                    alt="Logo"
                    className="logo"
                    />
                </div>
                <div className="deposit">
                    <button>Deposit</button>
                </div>
            </div>
        </>
    )
}

export default Header;