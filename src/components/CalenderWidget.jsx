import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";
import { useRecoilState } from 'recoil';
import { CalendarState } from '../store/atoms/CalendarState';
import GoogleLogo from '../images/google.png';
import { UserState } from '../store/atoms/UserState';
import MicrosoftLogo from '../images/microsoftlogo.png';
const CalenderWidget = () => {

    const [currentSection, setCurrentSection] = useState(1);



    const goToNextSection = () => {
        setCurrentSection(currentSection + 1);
    };

    const goToPrevSection = () => {
        setCurrentSection(currentSection - 1);
    };


    return (
        <div className='p-4'>


            {currentSection === 1 && <ScheduleCalendar goToNextSection={goToNextSection} currentSection={currentSection} />}
            {currentSection === 2 && <Section2 goToPrevSection={goToPrevSection} goToNextSection={goToNextSection} currentSection={currentSection} />}
            {currentSection === 3 && <Section3 />}

        </div>
    );
};


const ScheduleCalendar = ({ goToNextSection, currentSection }) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const time = ["1.30pm", "6.30pm", "8.00pm", "8.30pm", "9.00pm", "9.30pm"];
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useRecoilState(CalendarState);

    console.log(selectDate.toDate().toDateString(), currentDate)


    const handleClick = (index) => {
        setSelectedTimeIndex(index === selectedTimeIndex ? null : index);
    };

    return (
        <div style={{ maxHeight: '200px' }}>
            <h1 className='font-bold p-4 text-xl overflow-y-auto overflow-x-auto'>Select a Date & Time</h1>
            <div className="flex flex-col md:flex-row w-full justify-center items-center h-full px-4">
                <div className="h-full p-5">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-8">
                            <div className='bg-blue-200 text-blue-600 rounded-full p-2'>
                                <GrFormPrevious className="w-5 h-5 cursor-pointer rounded-full  " onClick={() => {
                                    setToday(today.month(today.month() - 1));
                                }} /></div>

                            <h1 className="cursor-pointer" onClick={() => {
                                setToday(currentDate);
                            }}>{months[today.month()]} {today.year()} </h1>
                            <div className='bg-blue-200 text-blue-600 rounded-full p-2'>
                                <GrFormNext className="w-5 h-5 cursor-pointer rounded-full " onClick={() => {
                                    setToday(today.month(today.month() + 1));
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-7 text-gray-600 gap-3">
                        {days.map((day, index) => (
                            <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
                        ))}
                    </div>
                    <div className="w-full grid grid-cols-7 gap-3">
                        {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                            <div key={index} className="h-14 grid place-content-center">
                                <h1
                                    className={cn(
                                        currentMonth ? "" : "text-gray-400",
                                        today ? "bg-red-600 text-white" : "",
                                        selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-blue-600 text-white" : "",
                                        "h-10 w-10 grid place-content-center rounded-full hover:bg-blue-400 hover:text-white transition-all cursor-pointer"
                                    )}
                                    onClick={() => setSelectDate(date)}
                                >
                                    {date.date()}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {selectDate.toDate().toDateString() !== currentDate.toDate().toDateString() &&
                        <div className="h-full w-96  flex flex-col gap-4  p-5 ">
                            <h1 className="font-semibold"> Schedule for {selectDate.toDate().toDateString()} </h1>
                            {

                                time.map((timeNo, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div
                                            className={cn(
                                                "border-2 w-full text-center p-3 text-xl cursor-pointer border-blue-100 text-blue-600 font-bold hover:border-blue-600 rounded-lg",
                                                selectedTimeIndex === index ? " border-blue-400 w-1/2" : ""
                                            )}
                                            onClick={() => {

                                                handleClick(index);
                                                setSelectedDateTime({ date: selectDate.toDate().toDateString(), time: timeNo })

                                            }}
                                        >
                                            {timeNo}
                                        </div>
                                        {selectedTimeIndex === index && (
                                            <button className="border-2 w-1/2 p-3 text-xl cursor-pointer border-blue-100 bg-blue-600 text-white font-bold  rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed"
                                                onClick={goToNextSection}
                                                disabled={currentSection === 3}
                                            >Next</button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


const Section2 = ({ goToPrevSection, goToNextSection, currentSection }) => {
    const [userData, setUserData] = useRecoilState(UserState)

    const NoOfPeople = ["🥕 Myself", "👩🏽‍🤝‍👩🏻 < 10 people", "🦄 10-50 people", "🦅 50+ people"]

    const WorkOptions = ["🗻 Strategy", "🌞 Product Management", "💻 Engineering", "🎣 Feedback management", "❓ Something else"
    ]

    return (
        <div style={{ maxHeight: '200px' }}>
            <div className='flex items-center gap-2 overflow-y-auto'>
                <button
                    onClick={goToPrevSection}
                    disabled={currentSection === 1}
                    className=" text-white bg-blue-500  disabled:bg-gray-300 disabled:cursor-not-allowed p-3 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </button>

            </div>

            <div className='flex flex-col gap-4 p-4 w-full '>
                <div className='mt-4'>Enter Details</div>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 "  >Name</label>
                    <input type="text" id="name" class="bg-gray-50 border border-blue-600 text-gray-900 text-sm rounded-lg  w-full p-2.5 " onChange={(e) => setUserData({ name: e.target.value })} required />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="text" id="email" class="bg-gray-50 border border-blue-600 text-gray-900 text-sm rounded-lg  w-full p-2.5  " required />
                </div>
                <div className='px-2 rounded-md text-blue-600 border-2 text-center border-blue-600 w-1/2 p-2'>Add Guests</div>


                <div>
                    <div class="block mb-2 text-sm font-medium text-gray-900 ">I want Fibery to work for :</div>
                    <div className='flex flex-col gap-4 '>
                        {NoOfPeople.map((item) => (
                            <div class="flex items-center  rounded ">
                                <input id="checkbox-item-11" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                                <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded ">{item}</label>
                            </div>
                        ))}
                    </div>
                </div>


                <div>
                    <div class="block mb-2 text-sm font-medium text-gray-900 ">Please, choose up to three options. You are more interested in : *</div>
                    <div className='flex flex-col gap-4 '>
                        {WorkOptions.map((item) => (
                            <div class="flex items-center rounded ">
                                <input id="checkbox-item-11" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                                <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded ">{item}</label>
                            </div>

                        ))}
                    </div>
                </div>

                <div>
                    <label for="qsn1" class="block mb-2 text-sm font-medium text-gray-900 ">Please, share anything that will help prepare for our meeting.</label>
                    <input type="text" id="qsn1" class="bg-gray-50 border border-blue-600 text-gray-900 text-sm rounded-lg  w-full p-4  " required />
                </div>

                <div>
                    <label for="qsn2" class="block mb-2 text-sm font-medium text-gray-900 ">Please, share with us the name of your Fibery workspace (if any)</label>
                    <input type="text" id="qsn2" class="bg-gray-50 border border-blue-600 text-gray-900 text-sm rounded-lg  w-full p-4  " required />
                </div>

                <div>By proceeding, you confirm that you have read and agree to ourTerms of Use and Privacy Notice.</div>

                <button className='w-1/2 rounded-2xl bg-blue-600 text-white p-3'
                    onClick={goToNextSection}
                    disabled={currentSection === 3}
                >Schedule Event</button>
            </div>
        </div>
    )
}

const Section3 = ({ goToNextSection, currentSection }) => {
    const [userData, setUserData] = useRecoilState(UserState)
    const [selectedDateTime, setSelectedDateTime] = useRecoilState(CalendarState);
    console.log(userData)
    return (
        <div style={{ maxHeight: '200px' }}>
            <div className='flex flex-col gap-2 justify-center items-center overflow-y-auto p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>

                <div className=''>✅ You are scheduled</div>
                <div>A calendar invitation has been sent to your email address.</div>
                <div className='flex flex-col gap-2 border-2 p-4'>
                    <div className='text-2xl font-bold'>Fibery Demo</div>
                    <div className='flex gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>{userData.name ?userData.name  :"Hi be prepare for you meetings"}</div>
                    <div className='flex gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg> {selectedDateTime.time}, {selectedDateTime.date}</div>
                    <div className='flex gap-2 items-center '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z" />
                    </svg> Web conferencing details to follow</div>

                </div>

                <hr class="w-[20rem] h-1 mx-auto my-4 bg-gray-300 border-0 rounded  " />

                <div className='font-bold '>Schedule your own meetings for free</div>
                <div className=''>Eliminate the back and forth emails for finding the time</div>

                <div className='flex gap-2'>
                    <button className='border-2 p-3 rounded-xl flex gap-2 border-black'><img src={GoogleLogo} width="21"></img>Signup with google</button>
                    <button className='border-2 p-3 rounded-xl flex gap-2 border-black'><img src={MicrosoftLogo} width="21"></img>Signup with microsoft</button>
                </div>
            </div>
        </div>
    )
}

export default CalenderWidget;
