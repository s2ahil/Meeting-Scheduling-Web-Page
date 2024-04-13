import { useState } from 'react'
import { Modal } from "./ManagePage"
import FiberyLogo from "../images/logo.png"
const AppBar = () => {
    const [showModal, setShowModal] = useState(false);

    const NavbarItems = [
        "Solutions", "Product", "Resources", "Pricing"
    ]


    return (
        <div>
            <div className="flex gap-1 md:gap-4 p-4 items-center justify-between">
                <div className='flex  gap-8 items-center'>
                <div className='text-2xl font-bold flex gap-2'>
                <img src={FiberyLogo} width="30" height="30" className='hidden md:block'></img>
                Fibery</div>
                <div className='hidden md:block md:flex gap-4'>
                    {NavbarItems.map((item) => (
                        <div>{item}</div>
                    ))}
                    </div>
                </div>

                <div className='flex gap-1 md:gap-4 items-center'>

                <div className="border-2   cursor-pointer p-2 border-black rounded-sm hover:bg-gray-200 " onClick={() => setShowModal(true)} >
                    Get a demo
                </div>
                <div className="border-2 cursor-pointer p-2 border-black bg-black text-white rounded-sm" >
                    Signup
                </div>
{/*                 <div className="border-2 cursor-pointer p-2  text-gray-800 rounded-sm" >
                    Login
                </div> */}
                </div>
            </div>

            <Modal onClose={() => setShowModal(false)} visible={showModal} />
        </div>
    )
}

export default AppBar
