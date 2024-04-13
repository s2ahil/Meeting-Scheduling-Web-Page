import { useState } from 'react'
import { CalenderWidget } from './ManagePage';
import Logo from "../images/logo.png"
import { useRecoilState } from 'recoil';
import { CalendarState } from '../store/atoms/CalendarState';


const Modal = ({ visible, onClose }) => {
    const [selectedDateTime, setSelectedDateTime] = useRecoilState(CalendarState);
    console.log(selectedDateTime)
    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  "
        >
            {/* overflow-y-auto overflow-x-hidden */}
            <div className="flex flex-col md:flex-row bg-white  md:divide-x rounded-lg  sm:max-h-[30rem] overflow-y-auto">
                <div className='divide-y'>
                    <div className="flex p-4 justify-center ">
                        <img src={Logo} alt="logo" width="100rem" className="hidden md:block"></img>
                    </div>
                    <div className='flex flex-col gap-4 p-4 '>
                        <div className='text-2xl font-bold'>Fibery Demo</div>
                        <div className='flex gap-2 items-center text-gray-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                            </svg>
                            45 min</div>
                        {selectedDateTime.date && selectedDateTime.time ?

                            <div className='flex gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                            </svg> {selectedDateTime.time} , {selectedDateTime.date}</div> : ""}

                        <p>Book a meeting with a product expert. We've <br></br>helped hundreds of companies overcome<br></br>
                            product management challenges. </p>

                    </div>
                </div>

                <div>

                    <CalenderWidget></CalenderWidget>
                </div>

            </div>

        </div>
    );
};

export default Modal
