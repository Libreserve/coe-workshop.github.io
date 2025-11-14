'use client'
import DatePicker from "../components/Datepicker/Datepicker";
import {useEffect, useState} from "react";

function history() {
    const [selectedDate, setSelectedDate] = useState('');
    return (
        <>
        {/* <DatePicker value={selectedDate} onChange={(value) => setSelectedDate(value)} ></DatePicker> */}
        {/* <div >whtttttttttttttttttttttttttttttttttttttttttttttttttfasdddddddddT</div> */}
        <input onChange={(e) => {setSelectedDate(e.target.value); console.log(e.target.value)}}  type="date"  />
        </>
    );
}

export default history;