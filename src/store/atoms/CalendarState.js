import { atom } from "recoil";


export const CalendarState = atom({

    key: 'CalendarState',
    default: {
        date: '',
        time: '',
    }
})